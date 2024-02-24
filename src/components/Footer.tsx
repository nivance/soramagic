import Image from "next/image";
import Link from "next/link";

const navigation = {
  introduction: [
    {name: "What's Sora", href: 'https://openai.com/sora', internal: false},
    {name: "Sora API", href: 'https://platform.openai.com/docs/overview', internal: false},
    {name: 'Sora Showcases', href: '/videos', internal: true},
    {name: 'Sora Prompts', href: '/sora-prompts', internal: true},
  ],
  // product: [
  //   {name: 'SoraMagic', href: 'https://soramagic.co'},
  //   {name: 'Introduction', href: 'https://soramagic.co'},
  // ],
  legal: [
    {name: 'Privacy Policy', href: '/privacy-policy'},
    {name: 'Terms & Conditions', href: '/terms-of-service'},
  ],
  credit: [
    {name: 'Sorawebui', href: 'https://sorawebui.com'},
  ]
}

export default function Footer({
                                 locale = '',
                                 description = ''
                               }) {
  return (
    <footer className="bg-[#000000]" aria-labelledby="footer-heading">
      <div id="footer-heading" className="sr-only">
        Footer
      </div>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="xl:grid xl:grid-cols-4 xl:gap-18">
          <div className="space-y-6">
            <div className="flex lg:flex-1">
              <a href={`/${locale}`} className="-m-1.5 p-1.5">
                <Image className="h-8 w-auto" src="/appicon.svg" alt="soramagic.co" width={32} height={32}/>
              </a>
              <a href={`/${locale}`} className="-m-1.5 ml-0.5 p-1.5">
                <Image
                  className="h-8 w-auto"
                  src="/soramagic.svg"
                  width={32}
                  height={24}
                  alt="soramagic.co"/>
              </a>
            </div>
            <p className="text-sm text-gray-300">
              {description}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="text-sm font-semibold leading-6 text-white"></div>
                <ul role="list" className="mt-6 space-y-4">
                </ul>
              </div>

            </div>
            <div className="md:grid md:grid-cols-3 md:gap-48">
              <div className="mb-5 mr-8 flex grow flex-col space-y-2 lg:mx-10">
                <div className="text-medium font-semibold leading-6 text-white">Introduction</div>
                {navigation.introduction.map((item) => {
                  let hrefTo = `${item.href}`;
                  if (`${item.internal}` === "true") {
                    hrefTo = `/${locale}${item.href}`;
                  }
                  return (
                    <a key={item.name} href={`${hrefTo}`} target={"_blank"} className="font-inter font-light whitespace-nowrap text-gray-300 hover:text-gray-500">{item.name}</a>
                )})}                            
              </div>              
              <div className="mt-10 md:mt-0">
                <div className="text-medium font-semibold leading-6 text-white">Legal</div>
                <ul role="list" className="mt-6 space-y-2">
                  {navigation.legal.map((item) => {
                    let hrefTo = `/${locale}${item.href}`;
                    if (locale == 'en') {
                      hrefTo = `${item.href}`;
                    }
                    return (
                      <li key={item.name}>
                        <Link href={`${hrefTo}`}
                              className="text-sm leading-6 whitespace-nowrap text-gray-300 hover:text-gray-500">
                              {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <div className="text-medium font-semibold leading-6 whitespace-nowrap text-white">CREDIT TO</div>
                <ul role="list" className="mt-6 space-y-2">
                  {navigation.credit.map((item) => {
                      return (
                        <li key={item.name}>
                          <Link href={`${item.href}`}
                                target={"_blank"}
                                className="text-sm leading-6 whitespace-nowrap text-gray-300 hover:text-gray-500">
                            {item.name}
                          </Link>
                        </li>
                      )
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
