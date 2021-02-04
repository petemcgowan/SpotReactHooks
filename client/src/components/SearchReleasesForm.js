import React, { useContext, useState } from 'react';
import { ReleaseContext } from '../contexts/ReleaseContext';
import { RecordCrateContext } from '../contexts/RecordCrateState';
import { Credentials } from './Credentials';
import uuid from 'uuid/v4';

const SearchReleaseForm = () => {
    // 'dispatchReleases' here means addRelease (now in the reducer)
    const { dispatchReleases} = useContext(ReleaseContext);
    const { recordCrate } = useContext(RecordCrateContext);

  const [searchTerms, setSearchTerms] = useState('');
  var [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    ////////////////////////////////
    // Pete Experimental Spotify get (a button would be better for this, and have it update localStorage, then the context will likely update the view
    const spotify = Credentials();
    if (token === '') {
      console.log ("token has no value, getting it now");
      token = await getToken(spotify.ClientId, spotify.ClientSecret);
      setToken(token);
    }
    console.log ("token value (post):" + token);
    const searchTerms = 'black%20loops%20year%3A2019-2020';
    // const searchTerms = UICtrl.inputField().searchTerm;
    console.log ('searchTerms is:' + searchTerms);
    // get the list of releases
    var releasesTrackLevel = [];
    if (token !== '' && token !== undefined) {
      await searchForTracks(token, searchTerms).then( (releaseDetails) => {

        releaseDetails.forEach (releaseDetail => {

          // Need to filter out release names that are already in the crate....
          var found = recordCrate.some((crateItem) => {
            console.log("crateItem.releaseName:" + crateItem.releaseName +
            "releaseDetail.name, "  +  releaseDetail.name +
            "crateItem.artists, "  +  crateItem.artists +
            "releaseDetail.artists[0].name, "  +  releaseDetail.artists[0].name);
            // console.log("crateItem.releaseName === releaseDetail.releaseName:" +
            //   crateItem.releaseName === releaseDetail.releaseName);
            // console.log("crateItem.artists === releaseDetail.artists[0].name:" +
            //   crateItem.artists === releaseDetail.artists[0].name);

            // console.log("crateItem.releaseName == releaseDetail.releaseName:" +
            //   crateItem.releaseName == releaseDetail.releaseName);
            // console.log("crateItem.artists == releaseDetail.artists[0].name:" +
            //   crateItem.artists == releaseDetail.artists[0].name);

            return ((crateItem.releaseName === releaseDetail.name) &&
              (crateItem.artists === releaseDetail.artists[0].name));
          });

          console.log ("releaseDetail:" + JSON.stringify(releaseDetail));
          if (!found) {

            releaseDetail.tracks.items.forEach (trackDetail => {

              console.log ("trackDetail:" + JSON.stringify(trackDetail));
              var releaseTrack = {
                artists: trackDetail.artists[0].name,
                href: trackDetail.href,
                releaseName: releaseDetail.name,
                trackName: trackDetail.name,
                label: releaseDetail.label,
                durationMiSecs: trackDetail.duration_ms,
                releaseDate: releaseDetail.release_date,
                albumType: releaseDetail.album_type,
                id: uuid()
              };

              releasesTrackLevel.push(releaseTrack);
            }); //end track detail
          } // end if found
        }); //end release detail
        console.log("submitReleases, releasesTrackLevel:" + releasesTrackLevel);

        // UICtrl.createTrackTable(releasesTrackLevel);

      });
    }
    ////////////////////////////////

    dispatchReleases({ type: 'ADD_RELEASES', releases:  releasesTrackLevel });
    setSearchTerms('');
  }

  const searchForTracks = async (token, searchTerms) => {
    // Pete NOTE: I oprhaned a lot of comments from SpotJavascript for clarity, get em back, they're todos!

    /* This works on Web Console:
    https://api.spotify.com/v1/search?q=artist
    %3Ablack%20loops%20year%3A2019-2020
    &type=album&market=DE
    &limit=3&offset=0
    */

    /* What you're using:
    https://api.spotify.com/v1/search?query=artist
    %3A%22black%2520loops%2520year%253A2019-2020%22+year%3A2020
    &type=album&market=DE
    &offset=0&limit=3
    */
    console.log("start of searchForTracks, searchTerms:" + searchTerms);
    const queryReleases =
      "https://api.spotify.com/v1/search?q=artist" +
      encodeURIComponent(":") +
      // encodeURIComponent(searchTerms) +
      searchTerms +
      '%20year%3A2019-2020' +
      // '%3Ablack%20loops%20year%3A2019-2020' +
      //encodeURIComponent('"') +
      "&type=album&market=DE&limit=3&offset=0";

    // get Releases
    const releaseResult = await fetch(queryReleases, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    console.log(
      "searchForTracks, releaseResult:" + JSON.stringify(releaseResult)
    );
    const releaseDataJson = await releaseResult.json();
    console.log(
      "searchForTracks, releaseDataJson:" + JSON.stringify(releaseDataJson)
    );

    let tracks = await Promise.all(
      releaseDataJson.albums.items.map(async (releaseEl) => {
        let queryTracksUrl = `${releaseEl.href}`;
        let trackResult = await fetch(queryTracksUrl, {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        });
        return trackResult.json();
      })
    );
    console.log("searchForTracks, tracks:" + tracks);
    console.log("searchForTracks, tracks(JSON):" + JSON.stringify(tracks));

    return tracks;
  };

  // const getRelease = async (token, trackEndPoint, trackArray) => {
  //   const result = await fetch(`${trackEndPoint}`, {
  //     method: "GET",
  //     headers: { Authorization: "Bearer " + token },
  //   });

  //   const data = await result.json();
  //   // for each track in release, add to track array
  //   await data.tracks.items.forEach((trackEl) => {
  //     console.log("searchForTracks, trackEl:" + JSON.stringify(trackEl.name));
  //     // same list box, but track level instead
  //     trackArray.push(trackEl);
  //   });

  //   console.log("getRelease:data:" + JSON.stringify(data));
  //   console.log("getRelease:trackArray:" + JSON.stringify(trackArray));
  //   return trackArray;
  // };



  const getToken = async (clientId, clientSecret) => {
    console.log ("in getToken");
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
    console.log ("getToken: after axios");

    const data = await result.json();
    console.log ("getToken: data" + JSON.stringify(data));
    return data.access_token;
  };


  return (
    <form onSubmit={handleSubmit}>

      <label>Artist to search for:
      <input type="text" placeholder="search Terms" value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)} required />
        </label>
      <input type="submit" value="Search Releases" />
    </form>
  );
}

export default SearchReleaseForm;


