import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // // useRef Hook : --- >
  const passwordRef = useRef(null);
  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0 , 3);    // // To select by giving the range
    window.navigator.clipboard.writeText(password)
  }, [password])


  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      str = str + '0123456789';
    }
    if (charAllowed) {
      str = str + '&%#@*^~_|$+=<>()[{}]?!'
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full h-44 max-w-2xl mx-auto shadow-md rounded-lg p-2 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 '>Copy</button>
        </div>
        <div className='flex text-sm gap-x-x2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursonPointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1 mx-2'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 mx-2'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charactedInput'
              onChange={() => { setCharAllowed((prev) => !prev) }}
            />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}
export default App