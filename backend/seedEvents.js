const mongoose = require('mongoose');
const Event = require('./models/Event');
const dotenv = require('dotenv');

dotenv.config();

const events = [
    {
        name: 'FIFA World Cup 2026',
        description: 'World Cup in North America (United States, Canada, and Mexico)',
        category: 'sports',
        startDate: new Date('2026-06-11T00:00:00Z'),
        endDate: new Date('2026-07-19T00:00:00Z'),
        targetDate: new Date('2026-06-11T00:00:00Z'),
        displayStartDate: 'Thursday, June 11, 2026',
        displayEndDate: 'Sunday, July 19, 2026',
        icon: '⚽',
        color: '#48bb78',
        isActive: true,
        history: 'The FIFA World Cup 2026 will be the first tournament to feature 48 teams, expanding from the previous 32-team format. This historic event marks the first time three nations will co-host the tournament, with matches spread across the United States, Canada, and Mexico. The final will be held at MetLife Stadium in New Jersey. This is the first World Cup in North America since USA 1994.',
        funFacts: [
            '🏆 First World Cup with 48 teams (up from 32)',
            '🌎 Three host nations for the first time in history',
            '🏟️ 16 host cities across North America',
            '⚽ 104 matches will be played (up from 64)',
            '🎟️ Expected 5.5 million spectators',
            '💰 Estimated $11 billion in economic impact'
        ]
    },
    {
        name: 'Christmas 2026',
        description: 'Christmas celebration',
        category: 'holidays',
        startDate: new Date('2026-12-25T00:00:00Z'),
        targetDate: new Date('2026-12-25T00:00:00Z'),
        displayStartDate: 'Friday, December 25, 2026',
        icon: '🎄',
        color: '#e53e3e',
        isActive: true,
        history: 'Christmas has been celebrated for over 1,700 years, commemorating the birth of Jesus Christ. The modern celebration combines Christian religious traditions with secular customs from various cultures. The tradition of gift-giving comes from the Three Wise Men who brought gifts to baby Jesus. Santa Claus evolved from Saint Nicholas, a 4th-century Greek bishop known for his generosity.',
        funFacts: [
            '🎅 Santa Claus concept based on Saint Nicholas (270-343 AD)',
            '🎄 Germany started the Christmas tree tradition in the 16th century',
            '🎁 Americans spend over $1 trillion during Christmas season',
            '📮 Over 3 billion Christmas cards are sent each year',
            '🦌 Rudolph the Red-Nosed Reindeer was created in 1939',
            '🎵 "Jingle Bells" was originally a Thanksgiving song'
        ]
    },
    {
        name: 'New Year 2027',
        description: 'Beginning of year 2027',
        category: 'holidays',
        startDate: new Date('2027-01-01T00:00:00Z'),
        targetDate: new Date('2027-01-01T00:00:00Z'),
        displayStartDate: 'Friday, January 1, 2027',
        icon: '🎉',
        color: '#d69e2e',
        isActive: true,
        history: 'New Year\'s Day has been celebrated for over 4,000 years, originally by ancient Babylonians in late March. The date was moved to January 1st by the Romans in 46 BC when Julius Caesar introduced the Julian calendar. Different cultures celebrate at different times - Chinese New Year follows the lunar calendar. The tradition of making resolutions dates back to ancient Babylon.',
        funFacts: [
            '🎊 Over 1 billion people watch the Times Square ball drop',
            '🍾 360 million glasses of champagne are consumed worldwide',
            '💋 The New Year\'s kiss tradition began in ancient Rome',
            '🎆 Sydney, Australia hosts the world\'s largest fireworks display',
            '📅 January is named after Janus, Roman god of beginnings',
            '💪 Only 8% of people achieve their New Year\'s resolutions'
        ]
    },
    {
        name: 'Milano Cortina 2026 Winter Olympics',
        description: 'Winter Olympic Games in Italy',
        category: 'sports',
        startDate: new Date('2026-02-06T00:00:00Z'),
        endDate: new Date('2026-02-22T00:00:00Z'),
        targetDate: new Date('2026-02-06T00:00:00Z'),
        displayStartDate: 'Friday, February 6, 2026',
        displayEndDate: 'Sunday, February 22, 2026',
        icon: '⛷️',
        color: '#3182ce',
        isActive: true,
        history: 'The 2026 Winter Olympics will be Italy\'s third time hosting the Winter Games (Cortina 1956, Turin 2006). This event emphasizes sustainability, using 93% existing or temporary venues. Milano and Cortina d\'Ampezzo will co-host, with events spread across the Italian Alps. These Games will feature 116 medal events across 16 sports.',
        funFacts: [
            '♻️ 93% of venues are existing or temporary structures',
            '⛷️ Cortina d\'Ampezzo hosted the 1956 Winter Olympics',
            '🏔️ Events will take place in the stunning Italian Alps',
            '🎿 First Olympics to use 100% renewable energy',
            '🏅 116 medal events across 16 sports',
            '🌍 Expected 3 billion TV viewers worldwide'
        ]
    },
    {
        name: 'Los Angeles 2028 Olympics',
        description: 'Summer Olympic Games in Los Angeles, California',
        category: 'sports',
        startDate: new Date('2028-07-21T00:00:00Z'),
        endDate: new Date('2028-08-06T00:00:00Z'),
        targetDate: new Date('2028-07-21T00:00:00Z'),
        displayStartDate: 'Friday, July 21, 2028',
        displayEndDate: 'Sunday, August 6, 2028',
        icon: '🏅',
        color: '#9f7aea',
        isActive: true,
        history: 'Los Angeles will host the Olympics for the third time (1932, 1984, 2028), becoming only the third city to do so after London and Paris. The 2028 Games promise to be car-free, using existing world-class venues like the LA Memorial Coliseum and SoFi Stadium. LA\'s 1984 Olympics were the first to turn a profit, setting a new standard for Olympic hosting.',
        funFacts: [
            '🏟️ Third time LA hosts (1932, 1984, 2028)',
            '🚗 First "car-free" Olympics using public transit',
            '💰 1984 LA Olympics made $250M profit',
            '🏊 Swimming events at USC and UCLA facilities',
            '🏀 Basketball finals at the brand-new Intuit Dome',
            '🎬 Hollywood influence: Opening ceremony will be spectacular'
        ]
    },
    {
        name: 'Halloween 2026',
        description: 'Halloween night',
        category: 'holidays',
        startDate: new Date('2026-10-31T00:00:00Z'),
        targetDate: new Date('2026-10-31T00:00:00Z'),
        displayStartDate: 'Saturday, October 31, 2026',
        icon: '🎃',
        color: '#ed8936',
        isActive: true,
        history: 'Halloween originated from the ancient Celtic festival of Samhain (pronounced "sow-in"), when people would light bonfires and wear costumes to ward off ghosts. When Irish immigrants came to America in the 1800s, they brought Halloween traditions with them. The practice of trick-or-treating became popular in the 1950s.',
        funFacts: [
            '🎃 Americans spend $10.6 billion on Halloween annually',
            '🍬 90% of parents admit to sneaking candy from their kids',
            '👻 "Halloween" means "All Hallows\' Eve" (evening before All Saints\' Day)',
            '🎭 The first Jack-o\'-Lanterns were made from turnips, not pumpkins',
            '🦇 Seeing a spider on Halloween is considered good luck',
            '🍫 Candy corn was invented in the 1880s'
        ]
    },
    {
        name: 'Valentine\'s Day 2026',
        description: 'Day of love and friendship',
        category: 'holidays',
        startDate: new Date('2026-02-14T00:00:00Z'),
        targetDate: new Date('2026-02-14T00:00:00Z'),
        displayStartDate: 'Saturday, February 14, 2026',
        icon: '💝',
        color: '#ed64a6',
        isActive: true,
        history: 'Valentine\'s Day is named after Saint Valentine, a Roman priest who performed secret weddings for soldiers forbidden to marry in the 3rd century. He was executed on February 14, 269 AD. The holiday became associated with romantic love in the Middle Ages. The first Valentine\'s Day card was sent in 1415 by Charles, Duke of Orleans, to his wife while imprisoned in the Tower of London.',
        funFacts: [
            '💌 145 million Valentine\'s Day cards are exchanged annually',
            '🌹 250 million roses are produced for Valentine\'s Day',
            '🍫 35 million heart-shaped chocolate boxes are sold',
            '💍 About 220,000 marriage proposals happen on Valentine\'s Day',
            '🐕 9 million people buy Valentine\'s gifts for their pets',
            '❤️ Teachers receive the most Valentine\'s cards'
        ]
    },
    {
        name: 'Spring 2026',
        description: 'Beginning of spring (Northern Hemisphere)',
        category: 'other',
        startDate: new Date('2026-03-20T00:00:00Z'),
        targetDate: new Date('2026-03-20T00:00:00Z'),
        displayStartDate: 'Friday, March 20, 2026',
        icon: '🌸',
        color: '#38b2ac',
        isActive: true,
        history: 'Spring begins at the vernal equinox, when the Earth\'s axis tilts neither toward nor away from the sun, resulting in nearly equal day and night. The word "spring" comes from the Old English "springan" (to leap, burst forth). Ancient cultures celebrated spring as a time of rebirth and renewal, with festivals like the Persian Nowruz and Roman Floralia.',
        funFacts: [
            '🌍 Spring equinox: day and night are nearly equal (12 hours each)',
            '🌺 More babies are conceived in spring than any other season',
            '🐣 Spring fever is real - increased daylight boosts serotonin',
            '🌷 The Netherlands exports 4.2 billion tulips annually in spring',
            '🦋 Monarch butterflies migrate up to 3,000 miles north in spring',
            '🌧️ Spring has the most tornadoes in the United States'
        ]
    },
    {
        name: 'Summer 2026',
        description: 'Beginning of summer (Northern Hemisphere)',
        category: 'other',
        startDate: new Date('2026-06-21T00:00:00Z'),
        targetDate: new Date('2026-06-21T00:00:00Z'),
        displayStartDate: 'Sunday, June 21, 2026',
        icon: '☀️',
        color: '#f6ad55',
        isActive: true,
        history: 'Summer begins at the summer solstice, the longest day of the year in the Northern Hemisphere. Ancient cultures celebrated this day with festivals - Stonehenge was built to align with the sunrise on summer solstice. The Romans honored Vesta, goddess of hearth, with the Vestalia festival. Many cultures still celebrate midsummer with bonfires and feasts.',
        funFacts: [
            '☀️ Summer solstice: longest day (up to 24 hours in Arctic Circle)',
            '🏖️ Over 70% of annual vacations are taken in summer',
            '⚡ Summer has the most thunderstorms and lightning',
            '🍦 Americans consume 23 gallons of ice cream per year, mostly in summer',
            '🌞 Eiffel Tower grows 6 inches taller in summer due to heat expansion',
            '🌊 Ocean temperatures peak in late summer, not during solstice'
        ]
    },
    {
        name: 'Fall 2026',
        description: 'Beginning of fall (Northern Hemisphere)',
        category: 'other',
        startDate: new Date('2026-09-23T00:00:00Z'),
        targetDate: new Date('2026-09-23T00:00:00Z'),
        displayStartDate: 'Wednesday, September 23, 2026',
        icon: '🍂',
        color: '#c05621',
        isActive: true,
        history: 'Fall (or Autumn) begins at the autumnal equinox, when day and night are equal length. The word "autumn" comes from Latin "autumnus" meaning "the passing of the year." Ancient cultures celebrated harvest festivals during this time. Fall is unique to Earth - our tilted axis creates seasons that would not exist otherwise.',
        funFacts: [
            '🍂 Fall equinox: equal day and night (12 hours each)',
            '🎃 Pumpkins grow to massive sizes - record is 2,749 pounds',
            '🍁 Leaves change color when chlorophyll breaks down',
            '🌰 Squirrels forget where they hide 50% of their nuts',
            '🦃 Americans consume 46 million turkeys on Thanksgiving',
            '🌙 Harvest Moon is the full moon nearest to fall equinox'
        ]
    },
    {
        name: 'Winter 2026',
        description: 'Beginning of winter (Northern Hemisphere)',
        category: 'other',
        startDate: new Date('2026-12-21T00:00:00Z'),
        targetDate: new Date('2026-12-21T00:00:00Z'),
        displayStartDate: 'Monday, December 21, 2026',
        icon: '❄️',
        color: '#63b3ed',
        isActive: true,
        history: 'Winter begins at the winter solstice, the shortest day of the year in the Northern Hemisphere. Ancient cultures feared winter\'s darkness and celebrated the solstice as a turning point when days would grow longer. Stonehenge aligns with winter solstice sunset. Romans celebrated Saturnalia, a precursor to modern Christmas celebrations.',
        funFacts: [
            '❄️ Winter solstice: shortest day (as little as 0 hours in Arctic Circle)',
            '☃️ No two snowflakes are alike - each has a unique crystal structure',
            '🧣 Your body loses heat 25 times faster in cold water than cold air',
            '🐻 Some animals hibernate for up to 8 months',
            '🌨️ The largest snowflake ever recorded was 15 inches wide',
            '☕ Hot chocolate dates back 2,000 years to the Mayans'
        ]
    },
    {
        name: 'Copa América 2027',
        description: 'South American national teams football tournament',
        category: 'sports',
        startDate: new Date('2027-06-12T00:00:00Z'),
        endDate: new Date('2027-07-04T00:00:00Z'),
        targetDate: new Date('2027-06-12T00:00:00Z'),
        displayStartDate: 'Saturday, June 12, 2027',
        displayEndDate: 'Sunday, July 4, 2027',
        icon: '⚽',
        color: '#4299e1',
        isActive: true,
        history: 'Copa América is the oldest international continental football competition, first held in 1916. Originally called South American Championship, it was renamed Copa América in 1975. The tournament was inspired by South America\'s first international football competition in 1910 to celebrate Argentina\'s independence. Uruguay and Argentina have won the most titles with 15 each.',
        funFacts: [
            '🏆 Oldest continental football tournament (since 1916)',
            '🇺🇾 Uruguay has won 15 titles, most of any nation',
            '⚽ Norberto Méndez scored in 6 consecutive tournaments (1945-1959)',
            '🎯 Brazil\'s Zizinho scored 17 goals in 1949, still a record',
            '👥 Over 100 million viewers watch the final',
            '🌎 Guest nations from other continents are often invited'
        ]
    }
];

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Clear existing events
        await Event.deleteMany({});
        console.log('Cleared existing events');

        // Insert new events
        await Event.insertMany(events);
        console.log('Successfully seeded events:', events.length);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding events:', error);
        process.exit(1);
    }
};

seedEvents();
