import { useTranslation } from "@/hooks";
import styles from "../authForm.module.scss";
import { QRCodeSVG } from "qrcode.react";

type TwoFAStepProps = {
  qrCodeUrl: string;
  onDone: () => void;
};

export const TwoFAStep = ({ qrCodeUrl, onDone }: TwoFAStepProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.auth__info}>
        <h1 className={styles.auth__title}>{t("Two-Factor Authentication")}</h1>
        <p className={styles.auth__text}>
          {t(
            "Scan this QR code with your authenticator app (e.g., Google Authenticator)"
          )}
        </p>
      </div>
      <div className={styles.auth__qr}>
        <QRCodeSVG value={qrCodeUrl} size={200} />
      </div>
      <div
        className={styles.auth__actions}
        style={{ justifyContent: "center" }}
      >
        <button type="button" className={styles.auth__button} onClick={onDone}>
          {t("Done")}
        </button>
      </div>
    </>
  );
};
