import EditEventTypeForm from "@/app/components/EditEventTypeForm";
import { prisma } from "@/app/prisma";
import { notFound } from "next/navigation";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  });
  if (!data) {
    return notFound();
  }

  return data;
}

async function page(props: { params: Promise<{ eventTypeId: string }> }) {
  const params = await props.params;
  const data = await getData(params.eventTypeId);
  console.log(data)
  return (
    <>
      <EditEventTypeForm callProvider={data.videoCallSoftware} description = {data.description} duration = {data.duration} id = {data.id} title = {data.title} url = {data.url}/>
    </>
  );
}

export default page;
