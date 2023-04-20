import { AuthProvider } from "services/AuthService";
import { BatchProvider } from "services/BatchService";
import { ModalProvider } from "services/ModalService";
import { ListingProvider } from "services/ListingService";

export function Providers({ children }) {
  return (
    <BatchProvider>
      <ListingProvider>
        <ModalProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ModalProvider>
      </ListingProvider>
    </BatchProvider>
  );
}


