import { SquareCheckBig } from 'lucide-react';
import { useState } from 'react';
import Register from './components/reusables/modals/register/register';
import { Toaster } from "@/components/ui/toast"
import LoginOwner from './components/reusables/modals/log-in/login_owner';
import LoginCustomer from './components/reusables/modals/log-in/login_customer';

function App() {
  const [register, setRegister] = useState(false)
  const [loginOwner, setLoginOwner] = useState(false)
  const [loginCustomer, setLoginCustomer] = useState(false)

  const buttons = [
    {
      text: 'Continue as Store Owner',
      action: () => setLoginOwner(true),
      hoverClass: 'hover:bg-green-100 hover:border-green-500 hover:text-green-700 hover:font-semibold'
    },
    {
      text: 'View My Utang',
      action: () => setLoginCustomer(true),
      hoverClass: 'hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700 hover:font-semibold'
    }
  ]

  const checks = [
    {
      icon: <SquareCheckBig size={10} />,
      text: 'Track unpaid balances'
    },
    {
      icon: <SquareCheckBig size={10} />,
      text: 'View payment history'
    },
    {
      icon: <SquareCheckBig size={10} />,
      text: 'Transparency'
    }
  ]
  return (
    <main className="flex h-screen">
      <Toaster position="top-right" />
      <section className="w-3/4 relative overflow-hidden">
        <img src="/images/sari-sari-store (1).jpg" alt="Sari-sari store" className="h-full w-full" />
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      </section>

      <section className="w-1/3 p-10 flex justify-center items-center h-screen">
        <div className=" flex flex-col">
          <img src="/images/kreditracker.png" alt="Kreditracker" className="h-10 w-40 mb-10" />

          <div className="flex flex-col gap-10">
            <div className='flex flex-col gap-2'>
              <div>
                <h1 className="font-medium text-2xl">Welcome To KrediTrack!</h1>
                <p className="text-xs">Manage your customer's utang digitally and avoid lost records.</p>
              </div>
              <div>
                <ul>
                {checks.map((check, index) => (
                    <li
                      key={index}
                      className='flex gap-2 text-xs text-gray-500'
                    >
                      {check.icon}
                      {check.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.action}
                  className={`p-4 text-xs border rounded-lg transition-all duration-300 cursor-pointer ${button.hoverClass}`}
                >
                  {button.text}
                </button>
              ))}
            </div>

            <div className='text-center'>
              <p 
                className='text-xs'
                >
                  Don't have an account yet? 
                  <span
                    onClick={() => setRegister(true)}
                    className='text-blue-500 hover:underline cursor-pointer ml-1'
                  >
                    Register here
                  </span>.
                </p>
            </div>
          </div>
        </div>
      </section>
      <Register
        register={register}
        onClose={() => setRegister(false)}
      />

      <LoginOwner 
        open={loginOwner}
        close={() => setLoginOwner(false)}
      />

      <LoginCustomer 
        open={loginCustomer}
        close={() => setLoginCustomer(false)}
      />
    </main>
  )  
}

export default App