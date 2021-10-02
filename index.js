const axios = require('axios');
const Agent = require('agentkeepalive');

const httpKeepAliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const httpsKeepAliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});


function deleteEmptyParams(query) {

    for (const param in query) {

        if (query[param] === undefined /* In case of undefined assignment */ ||
            query[param] === null ||
            query[param] === "") {
            delete query[param];
        }
    }

    return query;
}

class FootballData {

    constructor(token, timeout = 1000) {
        this.instance = axios.create({
            baseURL: 'http://api.football-data.org/v2/',
            timeout: timeout,
            headers: {
                'X-Auth-Token': token
            },
            httpAgent: httpKeepAliveAgent,
            httpsAgent: httpsKeepAliveAgent
        });
    }

    competitions({
        area,
        plan
    } = {}) {
        const searchParams = new URLSearchParams(deleteEmptyParams({
            areas: area,
            plan
        }));
        return this.instance.get(`/competitions?${searchParams.toString()}`)
    }

    competition(competitionId) {
        return this.instance.get(`/competitions/${competitionId}`)
    }

    teams(competitionId, {
        season,
        stage
    } = {}) {
        const searchParams = new URLSearchParams(deleteEmptyParams({
            season,
            stage
        }));
        return this.instance.get(`/competitions/${competitionId}/teams?${searchParams.toString()}`)
    }

    standings(competitionId, {
        standingType
    } = {}) {
        const searchParams = new URLSearchParams(deleteEmptyParams({
            standingType
        }));
        return this.instance.get(`/competitions/${competitionId}/standings?${searchParams.toString()}`)
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
        const searchParams = new URLSearchParams(deleteEmptyParams({
            dateFrom,
            dateTo,
            stage,
            status,
            matchday,
            group,
            season
        }));
        return this.instance.get(`/competitions/${competitionId}/matches?${searchParams.toString()}`)
    }

    matches({
        competitions,
        dateFrom,
        dateTo,
        status
    } = {}) {
        const searchParams = new URLSearchParams(deleteEmptyParams({
            competitions,
            dateFrom,
            dateTo,
            status
        }));
        return this.instance.get(`/matches?${searchParams.toString()}`)
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
        const searchParams = new URLSearchParams(deleteEmptyParams({
            dateFrom,
            dateTo,
            status,
            venue,
            limit
        }));
        return this.instance.get(`/teams/${id}/matches?${searchParams.toString()}`)
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
        const searchParams = new URLSearchParams(deleteEmptyParams({
            competitions,
            dateFrom,
            dateTo,
            status,
            limit
        }));
        return this.instance.get(`/players/${id}/matches?${searchParams.toString()}`)
    }

    scorers(competitionId, {
        limit,
        season
    } = {}) {
        const searchParams = new URLSearchParams(deleteEmptyParams({
            limit,
            season
        }));
        return this.instance.get(`/competitions/${competitionId}/scorers?${searchParams.toString()}`)
    }


}

module.exports = FootballData;