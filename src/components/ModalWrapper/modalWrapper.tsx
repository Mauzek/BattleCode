import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import styles from "./modalWrapper.module.scss";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const portalContainer = useRef(document.createElement("div"));

  const THRESHOLD = 80;

  const animateOpen = () => {
    if (!modalRef.current || !backdropRef.current) return;
    gsap.set(modalRef.current, { y: "100%" });
    gsap.set(backdropRef.current, { opacity: 0, pointerEvents: "auto" });

    gsap.to(backdropRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(modalRef.current, {
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const animateClose = (callback?: () => void) => {
    if (!modalRef.current || !backdropRef.current) return;
    gsap.to(modalRef.current, {
      y: "100%",
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: callback,
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power3.inOut",
      pointerEvents: "none",
    });
  };

  useEffect(() => {
    document.body.appendChild(portalContainer.current);
    return () => {
      document.body.removeChild(portalContainer.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) animateOpen();
    else animateClose();
  }, [isOpen]);

  useEffect(() => {
    const modal = modalRef.current;
    const content = modal?.querySelector(`.${styles.modal__content}`) as HTMLElement | null;
    if (!modal || !content) return;

    let startY = 0;
    let deltaY = 0;
    let isDraggingNow = false;
    let startScrollTop = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startScrollTop = content.scrollTop;
      deltaY = 0;
      isDraggingNow = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      deltaY = currentY - startY;

      if (startScrollTop <= 0 && deltaY > 0) {
        e.preventDefault();
        isDraggingNow = true;
        gsap.set(modal, { y: deltaY });
        gsap.set(backdropRef.current, {
          opacity: Math.max(0.3, 1 - deltaY / 300),
        });
      }
    };

    const onTouchEnd = () => {
      if (!isDraggingNow) return;
      if (deltaY > THRESHOLD) {
        animateClose(onClose);
      } else {
        gsap.to(modal, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      }
      isDraggingNow = false;
    };

    modal.addEventListener("touchstart", onTouchStart, { passive: false });
    modal.addEventListener("touchmove", onTouchMove, { passive: false });
    modal.addEventListener("touchend", onTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", onTouchStart);
      modal.removeEventListener("touchmove", onTouchMove);
      modal.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) animateClose(onClose);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleClickOutside}
    >
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.modal__dragHandle} />
        {title && <h2 className={styles.modal__title}>{title}</h2>}
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalContainer.current);
};
