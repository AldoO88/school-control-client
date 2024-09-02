const Instructions = ({ title1, text, title2, instructions, text2, options, setActiveQuiz}) => { 
    return (
      <div className="w-full sm:w-2/2">
      <div className="relative h-full ml-0 md:mr-10">
          <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
          <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
              <div className="flex items-center -mt-1">
                  <h1 className="my-2 ml-3 text-2xl font-bold text-gray-800">{title1}</h1>
              </div>
              <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
              <p className="mb-2 text-lg text-gray-600">{text}</p>
              <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
              <h2 className='font-bold text-lg'>{title2}</h2>
              <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
              <p><span className='font-bold text-lg'>Instrucciones:  </span><span>{instructions}</span></p>
              <div className='flex flex-row justify-evenly m-2 font-bold'>
                {options.map((option, index) => (
                  <span key={index}>{option}</span>
                ))}
              </div>
              <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
              <h1 className='font-bold my-10'>{text2}</h1>
              <button 
                className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                onClick={() => setActiveQuiz(true)}>
                Comenzar
              </button>
          </div>
      </div>
  </div>
    );
}

export default Instructions;