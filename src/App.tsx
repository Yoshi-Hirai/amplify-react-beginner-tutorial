import { Box, Button, ChakraProvider, Checkbox, Flex, Input, Text } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from 'react'

type Record = {
  id: number
  title: string
  isIncome: boolean
  amount: number
}

type Result = {
  id: number
  start: string
  studio: string
  instructor: string
  program: string
  count: number
}

function App() {
  const [records, setRecords] = useState<Record[]>([])
  const [title, setTitle] = useState<string>('')
  const [isIncome, setIsIncome] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)

  const [results, setResults] = useState<Result[]>([])
  const [instructor, setInstructor] = useState<string>('')
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    getRecords()

    async function getRecords() {

      const data_offline = [
        // 支出と入金のデータを作成
        {
          id: 1,
          title: 'お金を払う',
          isIncome: false,
          amount: 1000,
        }
      ]
      //      const response = await fetch('https://4niabz6kn5itximklhilh5ik340iucxq.lambda-url.ap-northeast-1.on.aws/',
      //        {
      //          mode: "cors",  // クロスオリジンリクエストであることを指定
      //          credentials: "include",
      //        }
      //      )
      //      const data = await response.json()
      //      console.log(data)
      //      setRecords(data)


      const response2 = await fetch('https://tl7wjv35kqaysb5z4kf22rnhhe0rexvh.lambda-url.us-east-1.on.aws/',
        {
          mode: "cors",  // クロスオリジンリクエストであることを指定
          credentials: "include",
        }
      )
      const data2 = await response2.json()
      console.log(data2)
      setResults(data2)
    }
  }, [])

  const addRecord = () => {
    const newRecord: Record = {
      id: records.length + 1,
      title: title,
      isIncome: isIncome,
      amount: amount || 0
    }
    setRecords([...records, newRecord]);
    setTitle('');
    setIsIncome(false);
    setAmount(0);
  };

  return (
    <ChakraProvider>
      <div>
        <Text fontSize='2xl'>家計簿アプリ</Text>
        <Box mb="8px">
          <Input placeholder='タイトルを入力' mb="4px" onChange={(e) => setTitle(e.target.value)} value={title} />
          <Input placeholder='支出を入力' mb="4px" onChange={(e) => setAmount(Number(e.target.value))} value={amount} />
          <Flex align="center" justifyContent="space-between">
            <Checkbox w="100px" onChange={() => setIsIncome(!isIncome)} isChecked={isIncome}>入金</Checkbox>
            <Button colorScheme='teal' onClick={addRecord}>追加</Button>
          </Flex>
        </Box>
        <div>
          {results.map((data) => (
            <div key={data.id}>
              <Flex align="center" justifyContent="space-between">
                <Text>{data.instructor}</Text>
                <Text>{data.count}</Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
