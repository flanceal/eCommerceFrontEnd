import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import React, { PropsWithChildren } from 'react';

interface SoonerProps {
  title: string;
  description: string;
}

const Sooner: React.FC<PropsWithChildren<SoonerProps>> = ({
  children,
  title,
  description,
}) => {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(title, {
          description: description,
        })
      }
    >
      {children}
    </Button>
  );
};

export default Sooner;
