import React from "react";
import userAuth from "../utils/userAuth";
import { prisma } from "../prisma";
import { notFound } from "next/navigation";
import EmptyState from "../components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
async function DashboardPage() {
  const session = await userAuth();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.eventType.length == 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below"
          buttonText="Add Event Type"
          href="/dashboard/new"
        ></EmptyState>
      ) : (
        <p>hey we have Event Types</p>
      )}
    </>
  );
}

export default DashboardPage;
