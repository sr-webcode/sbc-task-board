import { ToastProps, useToast } from '@chakra-ui/react';

const DEFAULT_TOAST_PROPS: Partial<ToastProps> = {
	position: 'top-right',
	isClosable: true,
	duration: 1000
};

const useNotification = () => {
	const toast = useToast();
	return {
		successNotify: (title: string) =>
			toast({ title, status: 'success', ...DEFAULT_TOAST_PROPS }),
		errorNotify: (title: string) =>
			toast({ title, status: 'error', ...DEFAULT_TOAST_PROPS })
	};
};

export default useNotification