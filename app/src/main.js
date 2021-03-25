let WebTorrent = require("webtorrent")
let VTTConverter = require('srt-webvtt');

if (WebTorrent.WEBRTC_SUPPORT) {
    console.log("supported");
}

client = new WebTorrent();
//var torrentId = `magnet:?xt=urn:btih:65cdcaa74f813c992a9ddd201251985885d42ab1&dn=%5bPuyaSubs!%5d%20Animation%20Kapibara-san%20-%2023%20%5bESP-ENG%5d%5b720p%5d%5b59F1D71B%5d.mkv&tr=http%3a%2f%2fnyaa.tracker.wf%3a7777%2fannounce&tr=udp%3a%2f%2fopen.stealth.si%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce`;
var torrentId = `magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent`

client.add(torrentId, (torrent) =>{
    console.log(torrent);
    let file = torrent.files.find(f=>f.name.endsWith('mp4'))
    let srtfile = torrent.files.find(f=>f.name.endsWith('es.srt'))
    if (file && srtfile) file.appendTo('body', (err, element) =>{
        let srt = srtfile.getBlob((err,blob)=>{
            console.log("Url", err);
            let vttconv = new VTTConverter.default(blob);
            vttconv.getURL().then((url)=>{
                var tnode = document.createElement("track")
                tnode.label=srtfile.name
                tnode.src = url;
                var video = document.querySelector("video");
                video.appendChild(tnode);
                video.textTracks[0].mode="show";
                console.log(video);
            });
        })
    })
});

client.on('torrent', t => {
    console.log("on torrent", t);
});
client.on("error", (e) =>{
    console.log("client error", e);
});

