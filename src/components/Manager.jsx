import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        if (ref.current.src.includes("icons/eye-crossed.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eye-crossed.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3
        ){
            setpasswordArray(prevArray => {
                const updatedArray = [...prevArray, {...form, id: uuidv4()}];
                localStorage.setItem("passwords", JSON.stringify(updatedArray));
                return updatedArray;
            });
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error: Password not saved!');
        }
    };

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(prevArray => {
                const updatedArray = prevArray.filter(item=>item.id!==id);
                localStorage.setItem("passwords", JSON.stringify(updatedArray));
                return updatedArray;
            });
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        setform(passwordArray.filter(item=>item.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    };



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="p-3 md:mycontainer text-white font-bold text-center min-h-[80vh]">
                <h1 className='text-4xl'>
                    <div className="logo font-bold text-2xl">
                        <span className="text-green-500">&lt;</span>
                        Pass
                        <span className="text-green-500">OP/&gt;</span>

                    </div>
                </h1>
                <p className='text-green-700 text-lg'>Your own Password Manager</p>
                <div className="flex flex-col  p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id="site"/>
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username'
                            className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id="username" />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id="password"/>
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="icons/eye.svg" alt="" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='text-white flex justify-center items-center rounded-full px-8 py-2 bg-green-600 w-fit hover:bg-green-500 gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon> Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-4 text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No password to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full px-2 rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 text-black'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site}>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center'>
                                            {item.username}
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center'>
                                            {item.password}
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white '>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                stroke="bold"
                                                state="hover-line"
                                                colors="primary:#2516c7,secondary:#109173"
                                                style={{"width":"26px", "height":"26px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/drxwpfop.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#110a5c,secondary:#110a5c"
                                                style={{"width":"26px", "height":"26px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                    </tbody>
                    </table>}
            </div>

        </div >
        </>
    )
}

export default Manager
