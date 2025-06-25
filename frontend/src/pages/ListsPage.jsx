import { useState } from "react"    
import { useQuery } from "@apollo/client"
import { GET_USER_LISTS } from "../graphql/queries"
import { useAuth } from "../components/providers/AuthProvider"
import { Box, Container, Typography, Button, Tabs, Tab, Avatar, Chip, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import { Header } from "../components/layout/Header"
import { ListCard } from "../components/lists/ListCard"
import { FilterList, Add } from "@mui/icons-material"

export default function ListsPage(){
    const { user } = useAuth()
    const {activeTab, setActiveTab} = useState(0)

    const { data, loading, error } = useQuery(GET_USER_LISTS, {
        variables: { userId: user.id },
    })

    if (!user){
        return (
            <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
                <Header />
                <Container sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Please log in to view your lists
                </Typography>
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Log In
                </Button>
                </Container>
            </Box>
        )
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          <Header />
    
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>{user.username[0].toUpperCase()}</Avatar>
              <Typography variant="h4" sx={{ fontWeight: "medium" }}>
                {user.username}
              </Typography>
            </Box>
    
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="YOUR LISTS" />
                <Tab label="SHARED WITH YOU" />
              </Tabs>
    
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Show ALL • Sort by WHEN UPDATED
                </Typography>
                <FilterList sx={{ color: "text.secondary" }} />
                <Button
                  component={Link}
                  to="/lists/new"
                  variant="contained"
                  sx={{ bgcolor: "grey.700", "&:hover": { bgcolor: "grey.600" } }}
                >
                  Start a new list...
                </Button>
              </Box>
            </Box>
    
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                {loading ? (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography color="text.secondary">Loading your lists...</Typography>
                  </Box>
                ) : error ? (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography color="error">Error loading lists: {error.message}</Typography>
                  </Box>
                ) : data?.getUserLists?.length > 0 ? (
                  <Grid container spacing={3}>
                    {data.getUserLists.map((list) => (
                      <Grid item xs={12} sm={6} md={4} key={list.id}>
                        <ListCard list={list} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      You haven't created any lists yet.
                    </Typography>
                    <Button component={Link} to="/lists/new" variant="contained" color="primary" startIcon={<Add />}>
                      Create Your First List
                    </Button>
                  </Box>
                )}
              </Box>
    
              <Box sx={{ width: 250 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", mb: 2, textTransform: "uppercase", fontSize: "0.875rem" }}
                >
                  List Tags
                </Typography>
                <Chip label="top 10" sx={{ bgcolor: "grey.700", color: "text.secondary" }} />
              </Box>
            </Box>
          </Container>
        </Box>
      )
}