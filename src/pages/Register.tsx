import { Link, type ActionFunction } from "react-router-dom"
import FormInput from "../components/FormInput"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const action: ActionFunction = async ({request}): Promise<null> => {
    return null;
}
function Register () {
    return (
        <>
        <section className='h-screen grid place-items-center'>
      <Card className='w-96 bg-muted'>
        <CardHeader>
          <CardTitle className='text-center'>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form>
            <FormInput type='text' name='username' defaultValue='test' />
            <FormInput type='email' name='email' defaultValue='test@test.com' />
            <FormInput type='password' name='password' defaultValue='secret' />

            <Button type='submit' variant='default' className='w-full mt-4'>
              Submit
            </Button>

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