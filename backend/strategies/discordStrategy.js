const DiscordStrategy = require('passport-discord').Strategy;
const passport = require("passport")
const scopes = ['identify', 'email', 'guilds', ];

const User = require("../models/User")
passport.use(new DiscordStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_REDIRECT,
        scope: scopes
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            let guilds = []
            let onlyOwnerGuilds = []
            if (profile) {
                onlyOwnerGuilds = profile.guilds.filter((d) => d.owner)
                guilds = profile.guilds;
            }
            const user = await User.findOne({ id: profile.id });
            if (user) {
                user.guilds = guilds;
                user.onlyOwnerGuilds = onlyOwnerGuilds;
                let savedUser = await user.save();
                if (savedUser)
                    return done(null, user)
            } else {
                let newProfile = new User({
                    id: profile.id,
                    username: profile.username,
                    email: profile.email,
                    locale: profile.locale,
                    guilds,
                    onlyOwnerGuilds

                })
                const savedUser = await newProfile.save();
                return done(null, savedUser)
            }


        } catch (error) {
            return done(error.message, null)

        }
    }));


passport.serializeUser((user, done) => {
    console.log("serialize")
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserialize")
    User.findOne({ id }, (err, user) => {
        done(err, user);
    });
});