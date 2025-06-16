import { useState } from "react";
import { Button } from "./ui/button";
import { Link,useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState<{username: string} | null>({username: 'demo user'})

    const handleLogout = () => {
        navigate('/');
        setUser(null)
    }
    return (
        <>
        <header>

            <div className="align-element flex justify-center sm:justify-end py-2">
                {/* user */}
                {user ? (
               <div  className="flex gap-x-2 sm:gap-x-8 items-center">
                <p className="text-xs sm:text-sm">Hello, {user.username}</p>
                <Button variant='link' size='sm' onClick={handleLogout}>
                    Logout</Button> 

               </div>
                ) : (
                    <div className="align-element flex">
                        <Button asChild variant='link' size='sm'>
                            <Link to='/login'>Sign in / Guest</Link>
                             </Button>
                              <Button asChild variant='link' size='sm'>
                            <Link to='/register'>Register</Link>
                             </Button>
                    </div>
                )}

            </div>
        </header>
        
        </>
    )
}
export default Header;