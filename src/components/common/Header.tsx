'use client';

import { jwtPayloadAtom } from '@/atom/auth';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Text } from '@/components/ui/text';
import { generalUserId } from '@/constants';
import useAuth from '@/hooks/auth/useAuth';
import DogImage from '@public/dog.jpg';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { useAtom } from 'jotai';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const { logout } = useAuth();
  const [payload] = useAtom(jwtPayloadAtom);

  const isLoggedIn = useMemo(
    () => !!payload?.userId && payload.userId !== generalUserId,
    [payload],
  );

  const handleLogout = () => {
    logout();
    setOpenNav(false);
  };

  const onSubmitComplete = () => {
    setOpenNav(false);
  };

  return (
    <header className="px-10 py-3 bg-white sm:border-b sm:border-gray-300 flex justify-between items-center">
      <div className="flex items-center">
        <strong className="ml-2">WanRun</strong>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="hidden sm:block">
          <Image
            className="w-10 h-10 rounded-full"
            src={DogImage}
            alt="DogImage"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>
              <Link href="/">ホーム</Link>
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem>
              <Link href="/dog">愛犬</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link href="/dogrun">ドッグラン</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/setting">設定</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isLoggedIn ? (
              <DropdownMenuItem onClick={handleLogout}>
                ログアウト
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => setOpenLogin(true)}>
                  ログイン
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenSignup(true)}>
                  登録
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={openNav} onOpenChange={setOpenNav}>
        <SheetTrigger className="sm:hidden" asChild>
          <Button
            variant="outline"
            size="circle-md"
            onClick={() => setOpenNav(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="py-16">
          <Link href="/dogrun" onClick={() => setOpenNav(false)}>
            <Button variant="ghost" size="full">
              <Text>ドッグラン</Text>
            </Button>
          </Link>
          <Link href="/setting" onClick={() => setOpenNav(false)}>
            <Button variant="ghost" size="full">
              <Text>設定</Text>
            </Button>
          </Link>
          <Separator className="my-2" />

          {isLoggedIn ? (
            <Button variant="ghost" size="full" onClick={handleLogout}>
              <Text>ログアウト</Text>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="full"
                onClick={() => setOpenLogin(true)}
              >
                <Text>ログイン</Text>
              </Button>
              <Button
                variant="ghost"
                size="full"
                onClick={() => setOpenSignup(true)}
              >
                <Text>登録</Text>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AuthModal
        open={openLogin}
        setOpen={setOpenLogin}
        onSubmitComplete={onSubmitComplete}
        type="login"
      />
      <AuthModal
        open={openSignup}
        setOpen={setOpenSignup}
        onSubmitComplete={onSubmitComplete}
        type="signup"
      />
    </header>
  );
};

export default Header;
