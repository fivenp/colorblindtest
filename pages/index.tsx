/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Box, Text, Heading, Icon, Link } from '@chakra-ui/core'
import Header from '../src/components/layout/Header'
import * as React from 'react'
import './main.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Head from '../src/components/layout/Head'

interface IndexProps {
  name: string
}

export const Container = (props: any) => (
  <Box width="full" maxWidth="2440px" mx="auto" px={6} {...props} />
)

export const Home = (props: any) => (
  <Box as="section" pt={40} pb={5}>
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
          </Text>
        </motion.div>
      </Box>
    </Container>
  </Box>
)

const Index: React.SFC<IndexProps> = props => {
  const [iframeUrl, setIframeUrl] = useState('')

  const updateIframe = (url: string) => {
    setIframeUrl(url)
  }

  return (
    <Box mb={20}>
      <Head title="Color Blind Test your website and product." />
      <Header setUrl={setIframeUrl} />
      <Container height="98vh" py={6} paddingTop="8rem">
        {iframeUrl && iframeUrl !== '' ? (
          <iframe width="100%" height="100%" src={iframeUrl} />
        ) : (
          <Home />
        )}
      </Container>
    </Box>
  )
}
export default Index
