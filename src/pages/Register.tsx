import { Form, Link, redirect, type ActionFunction } from "react-router-dom"
import FormInput from "../components/FormInput"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { customFetch } from "../utils/customFetch";
import { toast } from "../components/ui/use-toast";

import { AxiosError } from "axios";
import SubmitBtn from "../components/SubmitBtn";

export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/local/register', data);

    toast({ description: 'Registered' });
    return redirect('/login');
  } catch (error) {
    console.log(error);

    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data.error.message
        : 'Registration Failed';
    toast({ description: errorMsg });
    return null;
  }
};
function Register () {
    return (
        <>
        <section className='hS-screen grid place-items-center'>
      <Card className='w-96 bg-muted'>
        <CardHeader>
          <CardTitle className='text-center'>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form>
            <FormInput type='text' name='username' defaultValue='test' />
            <FormInput type='email' name='email' defaultValue='test@test.com' />
            <FormInput type='password' name='password' defaultValue='secret' />

            
            <SubmitBtn text='Register' className='w-full mt-4' />

            <p className='text-center mt-4'>
              Already a member?
              <Button type='button' asChild variant='link'>
                <Link to='/login'>Login</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
        </>
    )
}
export default Register