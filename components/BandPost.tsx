import { FormControl, CardHeader, Card, Stack, CardBody, Input, Button, Select, Tooltip, IconButton, ButtonGroup } from "@chakra-ui/react";
import { useState, useRef } from 'react'
import { AiOutlinePlayCircle } from "react-icons/ai";

function readFile(f: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.addEventListener('loadend', (e) => {
      resolve(e?.target?.result as ArrayBuffer)})
    reader.addEventListener('error', reject)
    reader.readAsArrayBuffer(f)
  })
}

export const BandPost = ({bandName}) => {

  const [ recording, setRecording ] = useState(false)
  const [ recorder, setRecorder ] = useState<MediaRecorder | null>(null)
  const [ url, setUrl ] = useState('')
  const [ audio, setAudio ] = useState<Blob>()

  const songName = useRef<HTMLInputElement>(null)
  const songKey = useRef<HTMLInputElement>(null)

  const record = async () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setRecorder(new MediaRecorder(stream))
      })
      .catch((error) => {
        console.error(error)
      })

    if (!recorder) return

    if (!recorder.ondataavailable) {
      recorder.ondataavailable = (event) => {
        setAudio(event.data)
        setUrl(URL.createObjectURL(event.data))
      }
    }

    if (recording) {
      recorder.stop()
      setRecording(false)
    } else {
      setRecording(true)
      recorder.start()
    }
  }

  const submit = async () => {
    if (
      songName.current &&
      audio
    ) {
      console.log(audio, typeof audio)
      await fetch('/api/newPost', {
        method: 'POST',
        body: JSON.stringify({
          pdf: '123',
          audio: Buffer.from(await readFile(audio as File)),
          bandName: bandName as string,
          songName: songName?.current?.value as string
        })
      })
    } else {
      return
    }
  }


  return (
    <Card mt='9rem'  mb='2rem' w='40rem' boxShadow='dark-lg'>
      <CardHeader fontWeight='bold'>Make A New Post!</CardHeader>
      <CardBody mt='-1.5rem'>
          <Stack spacing='3'>
            <FormControl>
              <Input ref={songName} placeholder='Song Title'></Input>
            </FormControl>
            <FormControl>
              <Input placeholder='Song Key' ref={songKey}/>
            </FormControl>
            <FormControl p='1rem'>
              {url && <audio src={url} controls></audio>}
            </FormControl>

          </Stack>
          <ButtonGroup>
            <Tooltip hasArrow label='Start Recording!'>
              <IconButton aria-label='startRecording' icon={<AiOutlinePlayCircle/>} onClick={record} colorScheme={'red'}/>
            </Tooltip>
            <Button> Upload PDF </Button>
            <Button onClick={submit}> Submit </Button>
          </ButtonGroup>
      </CardBody>
    </Card>
  )
}