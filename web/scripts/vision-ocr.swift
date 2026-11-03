import AppKit
import Foundation
import Vision

let path = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : ""
let url = URL(fileURLWithPath: path)
guard let image = NSImage(contentsOf: url),
      let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let cg = bitmap.cgImage else {
  fputs("The picture could not be read.\n", stderr)
  exit(1)
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true
request.recognitionLanguages = ["en-GB", "en-US"]
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([request])

let width = CGFloat(cg.width)
let height = CGFloat(cg.height)
for observation in request.results ?? [] {
  guard let candidate = observation.topCandidates(1).first else { continue }
  let box = observation.boundingBox
  let x = Int((box.origin.x * width).rounded())
  let y = Int(((1 - box.origin.y - box.height) * height).rounded())
  let w = Int((box.width * width).rounded())
  let h = Int((box.height * height).rounded())
  let text = candidate.string.replacingOccurrences(of: "\t", with: " ").replacingOccurrences(of: "\n", with: " ")
  print("\(candidate.confidence)\t\(x)\t\(y)\t\(w)\t\(h)\t\(text)")
}
