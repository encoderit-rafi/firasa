import SignOut from "@/components/ui/sign-out";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./_components/dashboard";
import AccountSettings from "./_components/account-settings";
import { getServerSession } from "next-auth";
import { API_BASE_URL } from "@/consts";
import { authOptions } from "@/utlis/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);

  let reports = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/get-user-own-reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token?.access_token}`,
      },
    });

    if (!res.ok) {
      console.error("Error:", res.status, res.statusText);
      const errorBody = await res.text();
      console.error("Response:", errorBody);
    } else {
      const data = await res.json();
      // console.log(data.data.data);
      reports = data.data.data;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <Tabs defaultValue="dashboard" className="container-xl px-base">
      <div className="border-bottom">
        <TabsList
          variant={"line"}
          className="flex h-fit! w-full items-center justify-between py-0"
        >
          <div className="flex-center">
            <TabsTrigger value="dashboard" className="py-3">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="account-settings" className="py-3">
              Account Settings
            </TabsTrigger>
          </div>
          <div className="border-secondary/10 flex-center h-full w-fit border-l py-3 pl-7.5">
            <SignOut />
          </div>
        </TabsList>
      </div>
      <div className="flex-center flex-1">
        <div className="container-lg w-full">
          <TabsContent value="dashboard">
            <Dashboard reports={reports} />
          </TabsContent>
          <TabsContent value="account-settings">
            <AccountSettings />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
