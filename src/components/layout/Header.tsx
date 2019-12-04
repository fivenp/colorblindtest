/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import NextLink from 'next/link'
import { MixpanelConsumer } from 'react-mixpanel'
// import mixpanel from 'mixpanel-browser'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  IconButton,
  useColorMode,
  Text,
  Stack,
  InputRightElement,
  Button,
} from '@chakra-ui/core'
import { FiSun, FiMoon } from 'react-icons/fi'
import { Formik, Field } from 'formik'
import Logo from '../Logo'

export const SearchBox = (props: any) => (
  <InputGroup {...props}>
    <Formik
      initialValues={{ url: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          props.setUrl(values.url)
          actions.setSubmitting(false)
        }, 1000)
      }}
      render={props => (
        <>
          <form onSubmit={props.handleSubmit}>
            <Field
              name="url"
              render={({ field, form }) => (
                <Input
                  variant="filled"
                  id="url"
                  focusBorderColor="blue.400"
                  placeholder="https://....."
                  _placeholder={{ color: 'gray.500', opacity: 1 }}
                  rounded="lg"
                  {...field}
                />
              )}
            />
            <InputRightElement>
              <IconButton
                mt={0}
                variantColor="blue"
                isLoading={props.isSubmitting}
                aria-label="Load URL"
                type="submit"
                icon="arrow-forward"
              />
            </InputRightElement>
          </form>
        </>
      )}
    />
  </InputGroup>
)

const Header = (props: any) => {
  const [colorFilter, setColorFilter] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()

  const switchColorFilter = (name: string, key: number) => {
    // mixpanel.track('FilterSwitch',{filter:name})
    colorFilter === name ? setColorFilter('') : setColorFilter(name)
    document.body.className = colorFilter === name ? `` : `colorblind${key}`
  }

  const bg = { light: 'white', dark: 'gray.800' }
  return (
    <MixpanelConsumer>
      {(_: any) => (
        <>
          <Box
            pos="fixed"
            as="header"
            top="0"
            zIndex="4"
            bg={bg[colorMode || 'dark']}
            left="0"
            right="0"
            borderBottomWidth="1px"
            width="full"
            height="4rem"
            {...props}
          >
            <Flex size="100%" px="4" align="center">
              <Flex align="center" mr={5}>
                <NextLink href="/" passHref>
                  <Box
                    as="a"
                    style={{ display: 'flex' }}
                    alignItems="center"
                    aria-label="Really dark patterns"
                  >
                    <Logo />
                    <Text
                      mx={4}
                      fontWeight="bold"
                      fontSize={['xs', 'xs', 'lg']}
                    >
                      <Box
                        display={{ sm: 'none', md: 'inline' }}
                        as="span"
                        opacity={0.5}
                      >
                        Color
                      </Box>
                      <Box
                        display={{ sm: 'none', md: 'inline' }}
                        as="span"
                        color="blue.400"
                      >
                        Blind
                      </Box>
                      <Box
                        display={{ sm: 'none', md: 'inline' }}
                        as="span"
                        opacity={0.5}
                      >
                        Test
                      </Box>
                    </Text>
                  </Box>
                </NextLink>
              </Flex>
              <SearchBox
                setUrl={props.setUrl}
                display={{ sm: 'block', md: 'block' }}
                // visibility="hidden"
                maxWidth="3xl"
                mx="auto"
                flex="1"
              />
              <Flex
                flex={{ sm: '1', md: 'none' }}
                ml={5}
                align="center"
                color="gray.500"
                justify="flex-end"
              >
                <IconButton
                  display={{ sm: 'block', md: 'block' }}
                  aria-label={`Switch to ${
                    colorMode === 'light' ? 'dark' : 'light'
                  } mode`}
                  variant="ghost"
                  color="current"
                  ml="2"
                  fontSize="20px"
                  onClick={toggleColorMode}
                  icon={colorMode === 'light' ? FiMoon : FiSun}
                />
              </Flex>
            </Flex>
          </Box>
          <Box
            pos="fixed"
            as="header"
            top="4rem"
            zIndex="4"
            bg={bg[colorMode || 'dark']}
            left="0"
            right="0"
            borderBottomWidth="1px"
            width="full"
            height="3rem"
            {...props}
          >
            <Flex size="100%" px="4" align="center" overflowX="scroll">
              <Stack spacing={4} isInline>
                {[
                  `protanopia`,
                  `protanomaly`,
                  `deuteranopia`,
                  `deuteranomaly`,
                  `tritanopia`,
                  `tritanomaly`,
                  `achromatopsia`,
                  `achromatomaly`,
                ].map((name, key) => (
                  <Button
                    size={'sm'}
                    key={name}
                    cursor="pointer"
                    // rounded="full"
                    variant={colorFilter === name ? 'solid' : 'outline'}
                    variantColor={colorFilter === name ? 'blue' : 'gray'}
                    onClick={() => {
                      switchColorFilter(name, key + 1)
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </Stack>
            </Flex>
          </Box>
        </>
      )}
    </MixpanelConsumer>
  )
}

export default Header
