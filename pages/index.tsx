/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Box, Text, Heading, Icon, Link, Button } from '@chakra-ui/core'
import Header, { SearchBox } from '../src/components/layout/Header'
import * as React from 'react'
import './main.scss'
import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import Head from '../src/components/layout/Head'
// import mixpanel from 'mixpanel-browser'
import { useDropzone } from 'react-dropzone'

interface IndexProps {
  name: string
}

const baseStyle = {
  alignItems: 'center',
  height: '100vh',
  padding: '20px',
  borderWidth: 4,
  borderRadius: 4,
  borderColor: 'transparent',
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
  margin: '0 auto',
}

export const Container = (props: any) => (
  <Box width="full" maxWidth="2440px" mx="auto" px={6} {...props} />
)

export const Home = (props: any) => {
  return (
    <Box as="section" pt='5vh' pb={5}>
      <Container>
        <Box maxW="4xl" mx="auto" textAlign="center">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ease: 'easeOut',
              duration: 0.2,
            }}
          >
            <Heading as="h1" size="2xl" fontWeight="bold">
              Color
              <Box as="span" color="blue.400">
                {' '}
                Blind{' '}
              </Box>
              Test
            </Heading>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ease: 'easeOut',
              duration: 0.2,
            }}
          >
            <Text opacity={0.7} fontSize="xl" mt="6">
              See your product, website or graphics with the eyes of Color Blind
              people. We hope to help you identify areas with accessability
              issues. You can and SHOULD{' '}
              <Link
                color="blue.400"
                href="https://www.color-blindness.com"
                isExternal
              >
                learn more about all types of color blindness{' '}
                <Icon name="external-link" mx="2px" />
              </Link>
            </Text>

            <Box mt="20"></Box>

            {props.children}
            {/*
              <Box mt="20"></Box>
              <Heading as="h2" size="lg" fontWeight="bold">
                Got
                <Box as="span" color="blue.400">
                  {' '}
                  Feedback?
                </Box>
              </Heading>
              <Text opacity={0.7} fontSize="xl" mt="6">
                Check us out on{' '}
                <Link
                  color="blue.400"
                  href="https://github.com/fivenp/colorblindtest"
                  isExternal
                >
                  GitHub <Icon name="external-link" mx="2px" />
                </Link>
              </Text> */}
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

const Index = () => {
  const [iframeUrl, setIframeUrl] = useState('')
  const [files, setFiles] = useState([])

  const updateIframe = (url: string) => {
    // mixpanel.track('LoadPage', { url })
    setIframeUrl(url)
  }

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/*',
    onDropAccepted: acceptedFiles => {
      setIframeUrl('')
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject],
  )

  const filePreviews = files.map(file => <img src={file.preview} style={img} />)

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files],
  )
  return (
    <Box mb={20}>
      <Head title="Color Blind Test your website and product." />
      <Header setUrl={updateIframe} />
      <Container height="98vh" py={6} paddingTop="8rem">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {iframeUrl && iframeUrl != '' ? (
            <iframe width="100%" height="100%" src={iframeUrl} />
          ) : files.length >= 1 ? (
            filePreviews
          ) : (
            <Home>
              <SearchBox
                setUrl={setIframeUrl}
                display={{ sm: 'block', md: 'block' }}
                maxWidth="xl"
                mx="auto"
                flex="1"
              />
              <Text opacity={0.7} fontSize="xs" mt="5" mb="5">
                OR
              </Text>
              <Button type="button" variantColor="blue" onClick={open}>
                Upload or drop an image here
              </Button>
            </Home>
          )}
        </div>
      </Container>
    </Box>
  )
}
export default Index
