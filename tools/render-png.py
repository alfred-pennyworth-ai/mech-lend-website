"""Render site/assets/og-image.png and site/assets/apple-touch-icon.png.

Pure Python (no dependencies) so it runs anywhere: the images are built from
the same rectangles and circles as og-image.svg and the app icon, drawn at 2x
and averaged down for anti-aliasing. Run from the repo root:

    python3 tools/render-png.py
"""
import os
import struct
import zlib

INK = (0xF2, 0xF2, 0xF0)
SURFACE = (0x0A, 0x0A, 0x0A)
SIGNAL = (0x7F, 0xC4, 0xFF)
METAL = (0xB8, 0xBB, 0xBF)
STEEL = (0x6A, 0x6D, 0x71)
SS = 2  # supersampling factor


class Canvas:
    def __init__(self, w, h, bg):
        self.w, self.h = w * SS, h * SS
        self.px = bytearray(bytes(bg) * (self.w * self.h))

    def _set(self, x, y, c):
        i = (y * self.w + x) * 3
        self.px[i:i + 3] = bytes(c)

    def rrect(self, x, y, w, h, r, c):
        x0, y0, x1, y1 = x * SS, y * SS, (x + w) * SS, (y + h) * SS
        r *= SS
        for py in range(max(0, int(y0)), min(self.h, int(y1 + 1))):
            cy = py + 0.5
            if not (y0 <= cy < y1):
                continue
            for px in range(max(0, int(x0)), min(self.w, int(x1 + 1))):
                cx = px + 0.5
                if not (x0 <= cx < x1):
                    continue
                dx = max(x0 + r - cx, 0, cx - (x1 - r))
                dy = max(y0 + r - cy, 0, cy - (y1 - r))
                if dx * dx + dy * dy <= r * r:
                    self._set(px, py, c)

    def circle(self, cx, cy, r, c):
        self.rrect(cx - r, cy - r, 2 * r, 2 * r, r, c)

    def save(self, path):
        w, h = self.w // SS, self.h // SS
        rows = bytearray()
        for y in range(h):
            rows.append(0)
            for x in range(w):
                acc = [0, 0, 0]
                for sy in range(SS):
                    for sx in range(SS):
                        i = ((y * SS + sy) * self.w + x * SS + sx) * 3
                        acc[0] += self.px[i]; acc[1] += self.px[i + 1]; acc[2] += self.px[i + 2]
                n = SS * SS
                rows += bytes((acc[0] // n, acc[1] // n, acc[2] // n))

        def chunk(tag, data):
            body = tag + data
            return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)

        png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
        png += chunk(b"IDAT", zlib.compress(bytes(rows), 9)) + chunk(b"IEND", b"")
        with open(path, "wb") as f:
            f.write(png)


def visor(cv, ox, oy, s):
    """The Visor mark (viewBox 0 0 36 30) at origin ox, oy and scale s."""
    cv.rrect(ox, oy, 36 * s, 30 * s, 9 * s, INK)
    cv.rrect(ox + 8.5 * s, oy + 12 * s, 19 * s, 6 * s, 1.5 * s, SURFACE)
    cv.circle(ox + 24 * s, oy + 15 * s, 2 * s, SIGNAL)


def og(path):
    cv = Canvas(1200, 630, SURFACE)
    visor(cv, 96, 255, 4)
    cv.rrect(624, -8, 200, 470, 4, INK)
    cv.rrect(662, 300, 124, 36, 4, SURFACE)
    cv.circle(760, 318, 10, SIGNAL)
    cv.rrect(840, -8, 400, 230, 4, METAL)
    cv.rrect(840, 238, 280, 224, 4, STEEL)
    for row in range(6):
        for col in range(8):
            cv.circle(864 + col * 32, 262 + row * 32, 3, SURFACE)
    for x0, x1 in ((624, 824), (840, 1120)):
        cv.rrect(x0, 500, 1.5, 20, 0, METAL)
        cv.rrect(x1 - 1.5, 500, 1.5, 20, 0, METAL)
        cv.rrect(x0, 509.25, x1 - x0, 1.5, 0, METAL)
    cv.save(path)


def touch_icon(path):
    # iOS masks the corners itself, so the ground is a full square.
    k = 180 / 512
    cv = Canvas(180, 180, SURFACE)
    visor(cv, 112 * k, 136 * k, 8 * k)
    cv.save(path)


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "site", "assets")
    og(os.path.join(out, "og-image.png"))
    touch_icon(os.path.join(out, "apple-touch-icon.png"))
