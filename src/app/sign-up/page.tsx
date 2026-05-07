import { AuthForm } from '@/components/auth/auth-form';

const SignUpPage = () => (
	<AuthForm
		title="Create account"
		description="Sign up with GitHub in one click."
		buttonText="Sign up with GitHub"
		linkPrefix="Already have an account?"
		linkText="Sign in"
		linkHref="/sign-in"
	/>
);

export default SignUpPage;
