import SignOut from "@/components/ui/SignOut";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./_components/dashboard";
import AccountSettings from "./_components/account-settings";
// import React from "react";

export default function page() {
  return (
    <Tabs defaultValue="dashboard" className="container-xl px-base ">
      <div className="border-bottom">
        <TabsList
          variant={"line"}
          className="flex items-center justify-between w-full py-0"
        >
          <div className="flex-center">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="account-settings">Account Settings</TabsTrigger>
          </div>
          <div className="w-fit h-full pl-7.5 border-l border-secondary/10 flex-center">
            <SignOut />
          </div>
        </TabsList>
      </div>
      <div className="flex-1 flex-center">
        <div className="container-lg  w-full">
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="account-settings">
            <AccountSettings />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
