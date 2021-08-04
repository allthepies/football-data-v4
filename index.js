const axios = require('axios');
const querystring = require('querystring');

class FootballData {
    constructor(token, timeout = 1000) {
        this.instance = axios.create({
            baseURL: 'http://api.football-data.org/v2/',
            timeout: timeout,
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    competitions({
        area,
        plan
    } = {}) {
        return this.instance.get(`/competitions?${querystring.stringify({areas: area, plan})}`)
    }

    competition(competitionId) {
        return this.instance.get(`/competitions/${competitionId}`)
    }

    teams(competitionId, {
        season,
        stage
    } = {}) {
        return this.instance.get(`/competitions/${competitionId}/teams?${querystring.stringify({season, stage})}`)
    }

    standings(competitionId, {
        standingType
    } = {}) {
        return this.instance.get(`/competitions/${competitionId}/standings?${querystring.stringify({standingType})}`)
    }

    competitionMatches(competitionId, {
        dateFrom,
        dateTo,
        stage,
        status,
        matchday,
        group,
        season
    } = {}) {
        return this.instance.get(`/competitions/${competitionId}/matches?${querystring.stringify({dateFrom, dateTo, stage, status, matchday, group, season})}`)
    }

    matches({
        competitions,
        dateFrom,
        dateTo,
        status
    } = {}) {
        return this.instance.get(`/matches?${querystring.stringify({competitions, dateFrom, dateTo, status})}`)
    }

    match(id) {
        return this.instance.get(`/matches/${id}`)
    }

    teamMatches(id, {
        dateFrom,
        dateTo,
        status,
        venue,
        limit
    } = {}) {
        return this.instance.get(`/teams/${id}/matches?${querystring.stringify({dateFrom, dateTo, status, venue, limit})}`)
    }

    team(id) {
        return this.instance.get(`/teams/${id}`)
    }

    areas(id) {
        return this.instance.get(`/areas/${id}`)
    }

    player(id) {
        return this.instance.get(`/player/${id}`)
    }

    playerMatches(id, {
        competitions,
        dateFrom,
        dateTo,
        status,
        limit
    } = {}) {
        return this.instance.get(`/players/${id}/matches?${querystring.stringify({competitions, dateFrom, dateTo, status, limit})}`)
    }

    scorers(competitionId, {
        limit,
        season
    } = {}) {
        return this.instance.get(`/competitions/${competitionId}/scorers?${querystring.stringify({limit,season})}`)
    }


}

module.exports = FootballData;