import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import fetch from 'ky'
import Image from "react-graceful-image"

import Modal from './modal.jsx'
import GlobalStyles from './global-styles.jsx'

const ALBUM_ID = 'AF1QipNe05HPETUlOwTPhsatbsIFGjSVUr2UGyBkQRs3GKuxwvpWBOSEhsMFtRgsuTuu0A'
const SHARE_KEY = 'T0w5dGJMLXVid21BbXowUEhkMWVHWVVteF9YOU1B'

const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g

const appendHd = str => str + '=w1920-h1080'
const extractPhotos = content => {
  const links = new Set()
  let match
  while (match = regex.exec(content)) {
    links.add(appendHd(match[1]))
  }
  return Array.from(links)
}

const fetchImages = async (id, key) => {
  const response = await fetch.get(`https://photos.google.com/share/${id}?key=${key}`)

  if (response.ok) {
    const result = await response.text()
    return { ok: true, result: extractPhotos(result) }
  } else {
    return {
      ok: false,
      error: response
    }
  }
}

const ImageList = ({ images }) => {
  if (!Array.isArray(images) && images.length === 0) {
    return null
  }

  return (<div css={`
    scroll-snap-type: y mandatory;
  `}>
  {images.map((image, index) => {
    return <Fragment key={index}><ImageWrapper><Image
    src={image}
    style={{ maxWidth: "100%", maxHeight: "100%" }}
    retry={{ count: 10, delay: 2 }}
    /></ImageWrapper></Fragment>
  })}
  </div>)
}

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 64px 24px;
  scroll-snap-align: start;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const App = () => {
  const [images, setImages] = useState([])
  const [error, setError] = useState({})
  const [listIsVisible, setIsListVisible] = useState(false)

  useEffect(() => {
    fetchImages(ALBUM_ID, SHARE_KEY).then((response) => {
      if (response.ok) {
        setImages(response.result)
      } else {
        setError(response.error)
      }
    })
  }, [])

  return (
    <Fragment>
      <GlobalStyles />
      <Modal onSuccess={() => setIsListVisible(true)} onFail={() => {
        setIsListVisible(false)
        setError({
          error: "Can't see anything 😞"
        })
      }}/>
      {listIsVisible ? <ImageList images={images} /> : null}
    </Fragment>
  )
}

export default App
