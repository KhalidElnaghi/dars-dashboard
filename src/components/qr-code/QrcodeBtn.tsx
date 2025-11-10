import QRCode from 'qrcode';
import Image from "next/image"
import { useState, useCallback } from "react";

import { Button } from "@mui/material"

import { useBoolean } from "src/hooks/use-boolean";

import { QrCode } from 'src/components/qr-code/QrModel';

interface IProps {
    width: number;
    height: number;
    title: string;
}

function QrcodeBtnImage({ width = 42, height = 42, title }: IProps) {
    const OpenQRcode = useBoolean(false);
    const [src, setSrc] = useState<string | null>(null);

    const handleClick = useCallback(() => {
        QRCode?.toDataURL('QRCode')
            .then((url) => {
                setSrc(url);
                OpenQRcode.onTrue();
            })
            .catch((err) => {
                console.error(err);
            });
    }, [OpenQRcode]);
    return (
        <>
            <Button variant="text" color="primary" onClick={handleClick}>
                <Image src="/assets/Branch/Qr.svg" width={width} height={height} alt="icon" />
            </Button>
            {OpenQRcode.value && (
                <QrCode
                    src={src}
                    title={title}
                    open={OpenQRcode.value}
                    onClose={() => {
                        OpenQRcode.onFalse();
                        setSrc(null);
                    }}
                />
            )}
        </>
    )
}

export default QrcodeBtnImage