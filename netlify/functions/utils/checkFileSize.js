const fileSize = file => {
  const raw_size = file.length - "data:image/png;base64,".length;
  return (4 * Math.ceil(raw_size / 3) * 0.5624896334383812) / 1000;
}

module.exports = fileSize