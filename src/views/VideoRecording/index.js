import React, { useEffect, useState, useRef } from "react"

export const VideoRecording = () => {
  const videoRef = useRef(null)
  const userRecordedData = useRef([])
  const screenRecordedData = useRef([])
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [screenMediaRecorder, setScreenMediaRecorder] = useState(null)
  const [stream, setStream] = useState(null)
  const [screenStream, setScreenStream] = useState(null)
  const [allVideos, setAllVideos] = useState([])

  const startRecording = async () => {
    try {
      // Provide the access form browser users camera and screen
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream
      }

      // set the standarad type of mediaRecorder to video/webm
      const cameraRecorder = new MediaRecorder(cameraStream, {
        mimeType: "video/webm;codecs=vp9,opus",
      })
      const screenRecorder = new MediaRecorder(screenStream, {
        mimeType: "video/webm;codecs=vp9,opus",
      })

      // insert data when data availabe usinf ondataavailable function
      cameraRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          userRecordedData.current.push(e.data)
        }
      }
      screenRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          screenRecordedData.current.push(e.data)
        }
      }

      // when stop the recording create bob url of separate recorder and store it
      cameraRecorder.onstop = async () => {
        const blob = new Blob(userRecordedData.current, { type: "video/webm" })
        const videoUrl = URL.createObjectURL(blob)
        userRecordedData.current = []
        setAllVideos((prev) => [...prev, videoUrl])
      }
      screenRecorder.onstop = async () => {
        const blob = new Blob(screenRecordedData.current, { type: "video/webm" })
        const videoUrl = URL.createObjectURL(blob)
        screenRecordedData.current = []
        setAllVideos((prev) => [...prev, videoUrl])
      }

      setMediaRecorder(cameraRecorder)
      setScreenMediaRecorder(screenRecorder)
      setStream(cameraStream)
      setScreenStream(screenStream)

      cameraRecorder.start()
      screenRecorder.start()
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  // stop all the recording data and null the ref objects
  const endRecording = async () => {
    try {
      if (mediaRecorder && stream) {
        mediaRecorder.stop()
        stream.getTracks().forEach((track) => track.stop())
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
      if (screenMediaRecorder && screenStream) {
        screenMediaRecorder.stop()
        screenStream.getTracks().forEach((track) => track.stop())
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
    } catch (e) {
      console.error("Error handling end recording:", e)
    }
  }

  

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    } else if (videoRef.current && screenStream) {
      videoRef.current.srcObject = screenStream
    }
  }, [stream, screenStream])

  return (
    <>
      <div className="flex gap-5 w-full">
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between p-4 gap-2 shadow-md overflow-x-hidden bg-white">
            <h2>Record Video and Audio Section</h2>
          </div>
          <div className="py-4 px-4 relative">
            <div className="flex gap-4">
              <div className="relative border-2 w-full h-[400px] rounded-lg bg-gray-600 border-gray-50 overflow-hidden">
                <video ref={videoRef} controls autoPlay muted style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
          <div className="w-full mt-5 mb-5 flex gap-4 justify-center items-center">
            <button onClick={startRecording} className="p-2 bg-blue-400 text-white rounded">
              Start
            </button>
            <button onClick={endRecording} className="p-2 bg-red-400 text-white rounded">
              End 
            </button>
          </div>
        </div>

        <div className="mt-10 w-1/2 p-2">
          <h3>Recorded Videos</h3>
          <div className="grid grid-cols-2 gap-4">
            {allVideos.map((videoUrl, index) => (
              <div key={index} className="relative border-2 w-full h-[200px] rounded-lg bg-gray-600 border-gray-50 overflow-hidden">
                <video src={videoUrl} controls style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
