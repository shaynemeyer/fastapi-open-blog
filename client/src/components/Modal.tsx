import { Dialog } from '@headlessui/react';

interface ModalProps {
  buttonText?: string;
  title?: string;
  children: React.ReactElement;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  buttonText = 'Open Modal',
  title = 'Modal Title',
  isOpen,
  setIsOpen,
  children,
}: ModalProps) => {
  return (
    <>
      <button
        className="btn-primary"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </button>

      {isOpen ? (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto rounded-lg bg-white w-1/3">
              {title ? (
                <Dialog.Title className="bg-stone-500 text-slate-200 rounded-t-lg p-4 text-lg font-bold">
                  {title}
                </Dialog.Title>
              ) : null}
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};

export default Modal;
