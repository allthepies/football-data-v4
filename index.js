const axios = require('axios');
const Agent = require('agentkeepalive');

const httpKeepAliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 40000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 20000, // free socket keepalive for 30 seconds
});

const httpsKeepAliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 40000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 20000, // free socket keepalive for 30 seconds
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

function requestParams(params) {

    const searchParams = new URLSearchParams(deleteEmptyParams(params));
    return searchParams.toString();
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

        return this.instance.get(`/competitions?${requestParams({
            areas: area,
            plan
        })}`)
    }

    competition(competitionId) {
        return this.instance.get(`/competitions/${competitionId}`)
    }

    teams(competitionId, {
        season,
        stage
    } = {}) {

        return this.instance.get(`/competitions/${competitionId}/teams?${requestParams({
            season,
            stage
        })}`)
    }

    standings(competitionId, {
        standingType
    } = {}) {

        return this.instance.get(`/competitions/${competitionId}/standings?${requestParams({
            standingType
        })}`)
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

        return this.instance.get(`/competitions/${competitionId}/matches?${requestParams({
            dateFrom,
            dateTo,
            stage,
            status,
            matchday,
            group,
            season
        })}`)
    }

    matches({
        competitions,
        dateFrom,
        dateTo,
        status
    } = {}) {

        return this.instance.get(`/matches?${requestParams({
            competitions,
            dateFrom,
            dateTo,
            status
        })}`)
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

        return this.instance.get(`/teams/${id}/matches?${requestParams({
            dateFrom,
            dateTo,
            status,
            venue,
            limit
        })}`)
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

        return this.instance.get(`/players/${id}/matches?${requestParams({
            competitions,
            dateFrom,
            dateTo,
            status,
            limit
        })}`)
    }

    scorers(competitionId, {
        limit,
        season
    } = {}) {

        return this.instance.get(`/competitions/${competitionId}/scorers?${requestParams({
            limit,
            season
        })}`)
    }


}

module.exports = FootballData;