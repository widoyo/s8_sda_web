import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

// Komponen Reusable
const StatikDialog = ({ open, onOpenChange, title, description, children }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[50]" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-[51] w-[90vw] max-w-md">
        <Dialog.Title className="font-bold text-lg">{title}</Dialog.Title>
        <Dialog.Description className="mt-2 text-gray-600">
          {description}
        </Dialog.Description>
        
        {/* Children akan ditampilkan di sini - bisa berisi data person */}
        {children}
        
        <div className="mt-4 flex justify-end">
          <Dialog.Close className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

StatikDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node
};

export default StatikDialog;