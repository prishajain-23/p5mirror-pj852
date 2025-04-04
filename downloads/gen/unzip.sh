cd "/Users/prishajain/Desktop/GitHub/p5mirror-pj852/downloads/../p5projects"
#
echo unzip 1 "IMS - Week 2 Assignment-7AK7ytvG9"
rm -rf "./IMS - Week 2 Assignment-7AK7ytvG9"
mkdir "./IMS - Week 2 Assignment-7AK7ytvG9"
pushd "./IMS - Week 2 Assignment-7AK7ytvG9" > /dev/null
unzip -q "../../downloads/zips/IMS - Week 2 Assignment-7AK7ytvG9"
popd > /dev/null
#
echo unzip 2 "cathy starter-mSHo9mFdl"
rm -rf "./cathy starter-mSHo9mFdl"
mkdir "./cathy starter-mSHo9mFdl"
pushd "./cathy starter-mSHo9mFdl" > /dev/null
unzip -q "../../downloads/zips/cathy starter-mSHo9mFdl"
popd > /dev/null
#
echo unzip 3 "IMS - Week 1 Assignment-Wem0w9PdVK"
rm -rf "./IMS - Week 1 Assignment-Wem0w9PdVK"
mkdir "./IMS - Week 1 Assignment-Wem0w9PdVK"
pushd "./IMS - Week 1 Assignment-Wem0w9PdVK" > /dev/null
unzip -q "../../downloads/zips/IMS - Week 1 Assignment-Wem0w9PdVK"
popd > /dev/null
#
echo unzip 4 "Code of Music - Interactive Timbre copy-m4hPglDGQ"
rm -rf "./Code of Music - Interactive Timbre copy-m4hPglDGQ"
mkdir "./Code of Music - Interactive Timbre copy-m4hPglDGQ"
pushd "./Code of Music - Interactive Timbre copy-m4hPglDGQ" > /dev/null
unzip -q "../../downloads/zips/Code of Music - Interactive Timbre copy-m4hPglDGQ"
popd > /dev/null
#
echo unzip 5 "Code of Music - Interactive Timbre-LiSa4674H"
rm -rf "./Code of Music - Interactive Timbre-LiSa4674H"
mkdir "./Code of Music - Interactive Timbre-LiSa4674H"
pushd "./Code of Music - Interactive Timbre-LiSa4674H" > /dev/null
unzip -q "../../downloads/zips/Code of Music - Interactive Timbre-LiSa4674H"
popd > /dev/null
#
echo unzip 6 "Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
rm -rf "./Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
mkdir "./Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
pushd "./Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4" > /dev/null
unzip -q "../../downloads/zips/Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi