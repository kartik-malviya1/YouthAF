import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function DropDownMenu() {
  return (
    <Menu as="div" className="relative inline-block ">
      <MenuButton className=" text-[color:var(--grey)] flex hover:text-[color:var(--red)] font-medium">
        Media
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 translate-0.5" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 bg-accent border z-10 mt-2 w-34 origin-top-right rounded-md outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ease-in-out"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="/news"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:text-white data-focus:outline-hidden"
            >
              News
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="/blogs"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:text-white data-focus:outline-hidden"
            >
              Blogs
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}