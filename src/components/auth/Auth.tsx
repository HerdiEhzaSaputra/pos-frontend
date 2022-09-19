import { createSignal } from 'solid-js'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [loading, setLoading] = createSignal(false)
    const [email, setEmail] = createSignal('')

    const handleLogin = async (e: SubmitEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email: email() })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        // <div class="w-full flex flex-wrap flex-center bg-black text-white justify-center">
        //     <div class="" aria-live="polite">
        //         <h1 class="text-6xl">Supabase + SolidJS</h1>
        //         <p class="mt-6">Sign in via magic link with your email below</p>
        //         <form class="mt-6" onSubmit={handleLogin}>
        //             <div>
        //                 <label for="email" class="text-gray-300">Email</label>
        //                 <input 
        //                     id="email"
        //                     type="email"
        //                     placeholder="Your email"
        //                     class="block text-gray-500 mt-2 w-full rounded-md border-gray-300 px-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        //                     value={email()}
        //                     onChange={(e) => setEmail(e.currentTarget.value)}
        //                 />
                        
        //             </div>
        //             <div>
        //                 <button type="submit" class="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-live="polite">
        //                     {loading() ?
        //                         <>
        //                             <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        //                                 <svg class="animate-spin h-5 w-5 text-indigo-400 group-hover:text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        //                                     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        //                                 </svg>
        //                             </span>
        //                             <span>Loading</span> 
        //                         </>
        //                         : 
        //                         <>
        //                             <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-indigo-400 group-hover:text-indigo-300">
        //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        //                                 </svg>
        //                             </span>
        //                             <span>Send magic link</span>
        //                         </>
        //                     }
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div class="row flex-center flex">
            <div class="col-6 form-widget" aria-live="polite">
                <h1 class="header">Supabase + SolidJS</h1>
                <p class="description">Sign in via magic link with your email below</p>
                <form class="form-widget" onSubmit={handleLogin}>
                <div>
                    <label for="email">Email</label>
                    <input
                    id="email"
                    class="inputField"
                    type="email"
                    placeholder="Your email"
                    value={email()}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit" class="button block" aria-live="polite">
                    {loading() ? <span>Loading</span> : <span>Send magic link</span>}
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}