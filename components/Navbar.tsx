import { useFamily } from '@/app/contexts/FamilyContextProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LinkSchema {
  name: string,
  href: string,
  subOptions?: { name: string, href: string }[],
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFamilyDropdownOpen, setIsFamilyDropdownOpen] = useState(false);
  const { setFamilyDropDownOpened} = useFamily()

 
  const navigationLinks: LinkSchema[] = [
    {
      name: "Home",
      href: "/users",
    },
    {
      name: "Attendances",
      href: "/attendances",
      subOptions: [
        { name: "By Family Name", href: "/attendances/family" },
        { name: "By Whole Church", href: "/attendances" }
      ]
    },
    {
      name: "Report",
      href: "/report",
    },
    {
      name: "Support",
      href: "/support",
    },
    {
      name: "Logout",
      href: "/logout",
    },
  ];

  const familyOptions = [
    { name: "Ebenezar", href: "/attendances/family/1" },
    { name: "Salvation Siblings", href: "/attendances/family/2" },
    { name: "Family Exaucee", href: "/attendances/family/3" },
  ];

  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return (
      <nav className='h-[80px]'>
        <div  className='bg-pink-300 h-full flex items-center justify-end gap-[3%] pr-[5%] text-white'>
          {navigationLinks.map((li, index) => 
            <div 
              className="relative" 
              key={index}
              onMouseEnter={() => {
                if (li.subOptions) {
                  setIsDropdownOpen(true);
                  if (li.name === "Attendances") 
                  setIsFamilyDropdownOpen(false); 
                  setFamilyDropDownOpened(false)
                }
              }} 
              onMouseLeave={() => {
                if (li.subOptions) {
                  setIsDropdownOpen(false);
                  setIsFamilyDropdownOpen(false); 
                }
              }}
            >
              <Link href={li.href}>
                {li.name}
              </Link>

              {li.subOptions && isDropdownOpen && 
                <div onMouseEnter={()=>setFamilyDropDownOpened(true)} onMouseLeave={()=>setFamilyDropDownOpened(false)} className="absolute top-full left-0 w-48 bg-white text-black shadow-lg rounded">
                  {li.subOptions.map((subOption, subIndex) => 
                    <div 
                      key={subIndex} 
                      onMouseEnter={() => subOption.name === "By Family Name" && setIsFamilyDropdownOpen(true)}
                      onMouseLeave={() => setIsFamilyDropdownOpen(false)}
                    >
                      <Link href={subOption.href} passHref>
                        <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          {subOption.name}
                        </div>
                      </Link>

                      {subOption.name === "By Family Name" && isFamilyDropdownOpen && 
                        <div onMouseEnter={()=>setFamilyDropDownOpened(true)}  className="absolute left-full top-0 mt-2 w-48 bg-white text-black shadow-lg rounded">
                          {familyOptions.map((family, familyIndex) => (
                            <Link key={familyIndex} href={family.href} passHref>
                              <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                {family.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      }
                    </div>
                  )}
                </div>
              }
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
