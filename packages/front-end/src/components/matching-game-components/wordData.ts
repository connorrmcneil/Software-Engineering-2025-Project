/**
 * All data for words, with images, audio, and translations. 
 * Hard coded at the moment but could be in db in future.
 * 
 * Author(s):
 * Wenda Tan
 */

import Placeholder from '@/assets/images/characters/placeholder.png'

// Word image imports
import alatu_image from '@/assets/images/words/ala\'tu.png'
import aqq_image from '@/assets/images/words/aqq.jpeg'
import eliey_image from '@/assets/images/words/eliey.jpeg'
import kesalk_image from '@/assets/images/words/kesalk.jpeg'
import kesalul_image from '@/assets/images/words/kesalul.png'
import kesatm_image from '@/assets/images/words/kesatm.jpeg'
import kil_image from '@/assets/images/words/ki\'l.jpeg'
import kiju_image from '@/assets/images/words/kiju\'.jpeg'
import ltu_image from '@/assets/images/words/l\'tu.jpeg'
import mijisi_image from '@/assets/images/words/mijisi.jpeg'
import nekm_image from '@/assets/images/words/nekm.png'
import nemitu_image from '@/assets/images/words/nemitu.jpeg'
import nin_image from '@/assets/images/words/ni\'n.jpeg'
import tata_image from '@/assets/images/words/ta\'ta.png'
import teluisi_image from '@/assets/images/words/teluisi.png'
import ula_image from '@/assets/images/words/ula.png'
import wejiey_image from '@/assets/images/words/wejiey.jpeg'
import weltasi_image from '@/assets/images/words/welta\'si.jpeg'
import wen_image from '@/assets/images/words/wen.jpeg'
import wiktm_image from '@/assets/images/words/wiktm.jpeg'

// Audio imports
import alatu_audio from '@/assets/audio/matching-game-audio/ala\'tu.mp3'
import aqq_audio from '@/assets/audio/matching-game-audio/aqq.mp3'
import eliey_audio from '@/assets/audio/matching-game-audio/eliey.mp3'
import kesalk_audio from '@/assets/audio/matching-game-audio/kesalk.mp3'
import kesalul_audio from '@/assets/audio/matching-game-audio/kesalul.mp3'
import kesatm_audio from '@/assets/audio/matching-game-audio/kesatm.mp3'
import kil_audio from '@/assets/audio/matching-game-audio/ki\'l.mp3'
import kiju_audio from '@/assets/audio/matching-game-audio/kiju\'.mp3'
import ltu_audio from '@/assets/audio/matching-game-audio/l\'tu.mp3'
import mijisi_audio from '@/assets/audio/matching-game-audio/mijisi.mp3'
import nekm_audio from '@/assets/audio/matching-game-audio/nekm.mp3'
import nemitu_audio from '@/assets/audio/matching-game-audio/nemitu.mp3'
import nin_audio from '@/assets/audio/matching-game-audio/ni\'n.mp3'
import tata_audio from '@/assets/audio/matching-game-audio/ta\'ta.mp3'
import teluisi_audio from '@/assets/audio/matching-game-audio/teluisi.mp3'
import ula_audio from '@/assets/audio/matching-game-audio/ula.mp3'
import wejiey_audio from '@/assets/audio/matching-game-audio/wejiey.mp3'
import weltasi_audio from '@/assets/audio/matching-game-audio/welta\'si.mp3'
import wen_audio from '@/assets/audio/matching-game-audio/wen.mp3'
import wiktm_audio from '@/assets/audio/matching-game-audio/wiktm.mp3'

// Word, Image, Audio Data, Translation
export interface WordInfo {
  text: string
  image: string
  audio: string
  english: string
}

export const WORD_INFO: WordInfo[] = [
  { text: "ni'n", image: nin_image, audio: nin_audio, english: "I" }, // I
  { text: "ki'l", image: kil_image, audio: kil_audio, english: "You" }, // you
  { text: "teluisi", image: teluisi_image, audio: teluisi_audio, english: "My name is" }, // My name is..
  { text: "aqq", image: aqq_image, audio: aqq_audio, english: "and" }, // and
  { text: "mijisi", image: mijisi_image, audio: mijisi_audio, english: "eat" }, // eat
  { text: "wiktm", image: wiktm_image, audio: wiktm_audio, english: "I like the taste of it" }, // I like the taste of it
  { text: "kesalk", image: kesalk_image, audio: kesalk_audio, english: "I love" }, // I love
  { text: "l'tu", image: ltu_image, audio: ltu_audio, english: "Make it" }, //Make it
  { text: "eliey", image: eliey_image, audio: eliey_audio, english: "I am going" }, // I am going
  { text: "nemitu", image: nemitu_image, audio: nemitu_audio, english: "I see it" }, // I see it
  { text: "kesatm", image: kesatm_image, audio: kesatm_audio, english: "I like " }, // I like
  { text: "wejiey", image: wejiey_image, audio: wejiey_audio, english: "I am coming from" }, // I am coming from
  { text: "ta'ta", image: tata_image, audio: tata_audio, english: "Dad" }, // Dad
  { text: "kiju'", image: kiju_image, audio: kiju_audio, english: "Mother / Grandmother" }, // Mother / Grandmother
  { text: "nekm", image: nekm_image, audio: nekm_audio, english: "Him or her" }, // Him or Her
  { text: "ala'tu", image: alatu_image, audio: alatu_audio, english: "I have it" }, // I have it
  { text: "ula", image: ula_image, audio: ula_audio, english: "Look at this" }, // Look at this
  { text: "kesalul", image: kesalul_image, audio: kesalul_audio, english: "I love you" }, // I love you
  { text: "welta'si", image: weltasi_image, audio: weltasi_audio, english: "I am happy" }, // I am happy
  { text: "wen", image: wen_image, audio: wen_audio, english: "Who" }, // Who
];

// Placeholder if there isn't at least 9 words
export const inactivePanel = Placeholder;

// How many words per month, +3 a month except last
export const MONTH_CONFIG: Record<string, number> = {
  'September': 3,
  'October': 6,
  'November': 9,
  'December': 12,
  'January': 15,
  'February': 18,
  'March': 20,
};

// Used to call MonthSelect component 
export const MONTHS = Object.keys(MONTH_CONFIG)