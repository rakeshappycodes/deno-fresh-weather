/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import {Handlers, PageProps} from "$fresh/server.ts";
import { Wether , Location , Current , Condition} from "../core/wether.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const appEnv = {
  API_KEY: String(Deno.env.get('API_KEY')),
  API_URL: String(Deno.env.get('API_URL')),
}

export const handler : Handlers< Wether | null> = {
  async GET(_,ctx){
    const resp = await fetch(appEnv.API_URL);
  
    if(resp.status === 200){
      const wether:Wether = await resp.json();
      return ctx.render(wether);
    }
    return ctx.render(null);
  }

}

export const Head = () => (
  <head>
      <title>Deno Wether App | Rakesh Roy</title>
  </head>
);

export default function Home({data} : PageProps<Wether | null>) {


  return (
    
    <div class={tw`w-screen h-screen bg-gray-900`}>
      <Head />
        <div class={tw`p-8 mx-auto max-w-screen-md`}>
       <div class={tw`flex items-center justify-center pt-5`}>
        <img
          src="/clouds.png"
          height="100"
          width="100"
          class="max-auto"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
      </div>
      <h1 class={tw`flex my-5 items-center justify-center text-center font-bold text(center 3xl white sm:gray-800 md:pink-700`}>Wether App</h1>
      {!data ? <h2>ERROR</h2> : 
      <div class={tw`flex justify-center`}>
        <div class={tw`card  min-w-sm max-w-sm border border-gray-100 bg-gray-50   transition-shadow test  shadow-lg hover:shadow-shadow-xl w-full bg-green-600 text-purple-50 rounded-md`}>
          <h2 class={tw`text-md mb-2 px-4 pt-4`}>
            <div class={tw`flex justify-between`}>
              <div class={tw`badge relative top-0`}>
                <span class={tw`mt-2 py-1 h-12px text-md font-semibold w-12px  rounded right-1 bottom-1 px-4`}>{data.location.name}</span></div>
              <span class={tw`text-lg font-bold `}>{data.current.last_updated}</span>
            </div>
          </h2>
          <div class={tw`flex items-center p-4`}>
              <div class={tw`flex justify-center items-center w-96`}>
                <div class={tw`flex items-center justify-center pt-5`}>
                  <img
                    src={data.current.condition.icon}
                    height="100"
                    width="100"
                    class="max-auto"
                    alt="the fresh logo: a sliced lemon dripping with juice"
                  />
                </div>
              </div>
          </div>
          <div class={tw`text-md pt-4 pb-4 px-4`}>
              <div class={tw`flex justify-between items-center`}>
                <div class={tw`space-y-2`}>
                  <span class={tw`flex space-x-2 items-center`}>
                    <svg height="20" width="20" viewBox="0 0 32 32" class="fill-current"><path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path><path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path></svg> <span>{data.current.wind_kph}km/h</span></span><span class="flex space-x-2 items-center"><svg height="20" width="20" viewBox="0 0 32 32" class="fill-current"><path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path><path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path></svg>
                     <span>{data.current.humidity}%</span></span>
                </div>
                <div>
                  <h1 class={tw`text-6xl`}> {data.current.temp_c}° <small>C</small> </h1>
                </div>
              </div>
          </div>
        </div>
      </div>
      }
    </div>
    </div>
  );
}
