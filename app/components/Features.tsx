import { CloudRain } from "lucide-react";
import React from "react";

const features = [
    {
      name: "Sign up for free",
      description: "Get started quickly and easily - no credit card required. Explore all the features with a free account.",
      icon: CloudRain,
    },
    {
      name: "Blazing fast",
      description: "Experience lightning-fast performance and seamless interactions. Get things done in a snap.",
      icon: CloudRain,
    },
    {
      name: "Secured with Nylas",
      description: "Rest easy knowing your data is protected by Nylas's industry-leading security infrastructure. Your privacy is our priority.",
      icon: CloudRain,
    },
    {
      name: "Easy to Use",
      description: "Intuitive design and straightforward navigation make it simple for anyone to use, regardless of technical skill.",
      icon: CloudRain,
    },
  ];

function Features() {
  return (
    <>
      <div className="py-24">
        <div className="max-ww-2xl mx-auto lg:text-center">
          <p className="text-center font-semibold leading-7 text-primary">
            Schedule Faster
          </p>
          <h1 className="text-center mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Schedule meetings in minutes!
          </h1>
          <p className="text-center mt-6 text-base leading-snug text-muted-foreground">
            Skyflow lets you schedule meetings in minutes. We make it easy for
            you to quickly schedule meetings. Scheduling meetings with Skyflow
            is fast and simple.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-16">
                <div className="text-base font-medium leading-7">
                  <div className="absolute left-0 top-0 size-10 items-center justify-center  rounded-lg">
                    <feature.icon className="size-8 p-1.5 rounded-lg  text-white bg-primary " />
                  </div>
                  {feature.name}
                </div>
                <div className="mt-2 text-sm text-muted-foreground leading-snug">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
