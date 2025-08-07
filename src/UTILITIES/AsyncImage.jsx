import { useEffect, useState } from "react";
import { storage_DownloadMedia } from "react-library/src/firebase";
import { storage } from "../firebase";

export function AsyncImage({ path, classes }) {
    const [url, setUrl] = useState(null)

    async function onLoad() {
        await storage_DownloadMedia(storage, path, (tempUrl) => {
            setUrl(tempUrl)
        })
    }

    useEffect(() => {
        onLoad()
    }, [])

    return <div className="">
        {
            url !== null && <img src={url} className={`full-width ${classes}`} />
        }
    </div>
}