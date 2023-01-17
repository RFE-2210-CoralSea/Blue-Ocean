import Head from 'next/head'
import { Container, Box, Text} from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import { useColorModeValue } from '@chakra-ui/react'

const innerBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: 'full',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
  }


export default function Home() {

  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
      </Head>

      <Box
        height="100vh"
        background="center/cover"
        backgroundImage={useColorModeValue("white", "animatedBackground.svg")}
        backgroundRepeat="no-repeat"
        >
        <Container>
          <NavBar/>
        </Container>
        <Box
          height='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexWrap='wrap'
        >
          <Container
            border='1px'
            width='200px'
            height='200px'
            bgColor='transparent'
          >
          </Container>
          <Container
            border='1px'
            borderBottomLeftRadius='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Text textAlign='center' fontSize='3xl' fontWeight='bold'>
              A Social Media Platform for The <Text as='span'
                fontSize='6xl'
                fontWeight='extrabold'
                bgGradient={useColorModeValue('linear(to-r, #F9A824, #87D8C8)','linear(to-r, #9B9B9B, #87D8C8)' )}
                bgClip='text'
              >
                  Sonically Inclined
              </Text>
            </Text>
          </Container>
        </Box>
      </Box>
    </>
  )
}
