import SocialLoginClient from "./SocialLoginCient";


type Props = {
  params: Promise<{
    login: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SocialLoginPage({ params, searchParams }: Props) {
  const { login } = await params;
  const query = await searchParams;

  const provider = login[0];

  const queryString = new URLSearchParams(query as Record<string, string>).toString();


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/${provider}/callback?${queryString}`
  );

  const data = await response.json();

  return <SocialLoginClient data={data} />;
}