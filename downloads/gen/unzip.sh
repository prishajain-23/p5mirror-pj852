cd "/Users/prishajain/Desktop/GitHub/p5mirror-pj852/downloads/../p5projects"
#
echo unzip 1 "win or lose -prish notes-wpk9J2sf2"
rm -rf "./win or lose -prish notes-wpk9J2sf2"
mkdir "./win or lose -prish notes-wpk9J2sf2"
pushd "./win or lose -prish notes-wpk9J2sf2" > /dev/null
unzip -q "../../downloads/zips/win or lose -prish notes-wpk9J2sf2"
popd > /dev/null
#
echo unzip 2 "tree with ml5-ReytsMyfE"
rm -rf "./tree with ml5-ReytsMyfE"
mkdir "./tree with ml5-ReytsMyfE"
pushd "./tree with ml5-ReytsMyfE" > /dev/null
unzip -q "../../downloads/zips/tree with ml5-ReytsMyfE"
popd > /dev/null
#
echo unzip 3 "Markov chain starter-9jBFc35Ga"
rm -rf "./Markov chain starter-9jBFc35Ga"
mkdir "./Markov chain starter-9jBFc35Ga"
pushd "./Markov chain starter-9jBFc35Ga" > /dev/null
unzip -q "../../downloads/zips/Markov chain starter-9jBFc35Ga"
popd > /dev/null
#
echo unzip 4 "Markov chain - drum kit-AMG5QwZVl"
rm -rf "./Markov chain - drum kit-AMG5QwZVl"
mkdir "./Markov chain - drum kit-AMG5QwZVl"
pushd "./Markov chain - drum kit-AMG5QwZVl" > /dev/null
unzip -q "../../downloads/zips/Markov chain - drum kit-AMG5QwZVl"
popd > /dev/null
#
echo unzip 5 "Tone.Oscillator - random partials-LvLSde4yn"
rm -rf "./Tone.Oscillator - random partials-LvLSde4yn"
mkdir "./Tone.Oscillator - random partials-LvLSde4yn"
pushd "./Tone.Oscillator - random partials-LvLSde4yn" > /dev/null
unzip -q "../../downloads/zips/Tone.Oscillator - random partials-LvLSde4yn"
popd > /dev/null
#
echo unzip 6 "[GirlTime] TOF-Reverb-r6D3ARq8P"
rm -rf "./[GirlTime] TOF-Reverb-r6D3ARq8P"
mkdir "./[GirlTime] TOF-Reverb-r6D3ARq8P"
pushd "./[GirlTime] TOF-Reverb-r6D3ARq8P" > /dev/null
unzip -q "../../downloads/zips/[GirlTime] TOF-Reverb-r6D3ARq8P"
popd > /dev/null
#
echo unzip 7 "Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
rm -rf "./Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
mkdir "./Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
pushd "./Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4" > /dev/null
unzip -q "../../downloads/zips/Tone.Oscillator - ADSR envelope & filters-Dx-K95gU4"
popd > /dev/null
#
echo unzip 8 "ims-03-GICHOb36j"
rm -rf "./ims-03-GICHOb36j"
mkdir "./ims-03-GICHOb36j"
pushd "./ims-03-GICHOb36j" > /dev/null
unzip -q "../../downloads/zips/ims-03-GICHOb36j"
popd > /dev/null
#
echo unzip 9 "IMS - Week 3 Assignment-4pxXBtfPW"
rm -rf "./IMS - Week 3 Assignment-4pxXBtfPW"
mkdir "./IMS - Week 3 Assignment-4pxXBtfPW"
pushd "./IMS - Week 3 Assignment-4pxXBtfPW" > /dev/null
unzip -q "../../downloads/zips/IMS - Week 3 Assignment-4pxXBtfPW"
popd > /dev/null
#
echo unzip 10 "scale keyboard - frequencies - n octaves copy-5RLhSlVcZ"
rm -rf "./scale keyboard - frequencies - n octaves copy-5RLhSlVcZ"
mkdir "./scale keyboard - frequencies - n octaves copy-5RLhSlVcZ"
pushd "./scale keyboard - frequencies - n octaves copy-5RLhSlVcZ" > /dev/null
unzip -q "../../downloads/zips/scale keyboard - frequencies - n octaves copy-5RLhSlVcZ"
popd > /dev/null
#
echo unzip 11 "random melody loop within scale - n octaves copy copy-WBtwiUpFv"
rm -rf "./random melody loop within scale - n octaves copy copy-WBtwiUpFv"
mkdir "./random melody loop within scale - n octaves copy copy-WBtwiUpFv"
pushd "./random melody loop within scale - n octaves copy copy-WBtwiUpFv" > /dev/null
unzip -q "../../downloads/zips/random melody loop within scale - n octaves copy copy-WBtwiUpFv"
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