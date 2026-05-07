import { AuthForm } from '@/components/auth/auth-form';

const SignInPage = () => (
	<AuthForm
		title="Sign in"
		description="Continue with GitHub to access your account."
		buttonText="Continue with GitHub"
		linkPrefix="No account yet?"
		linkText="Create one"
		linkHref="/sign-up"
	/>
);

export default SignInPage;
