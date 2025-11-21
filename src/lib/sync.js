import { supabase } from "./supabase";

// [MB] Sync Service
// Handles data synchronization between Local State and Supabase

export async function fetchUserData(userId) {
  if (!userId) return null;

  try {
    // 1. Profile (Economy, Progress)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      console.warn("Error fetching profile:", profileError);
    }

    // 2. Inventory
    const { data: inventory, error: inventoryError } = await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", userId);

    if (inventoryError) console.warn("Error fetching inventory:", inventoryError);

    // 3. Tasks
    const { data: tasks, error: tasksError } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .eq("is_deleted", false); // Only active tasks for now

    if (tasksError) console.warn("Error fetching tasks:", tasksError);

    // 4. Journal
    const { data: journal, error: journalError } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId);
      
    if (journalError) console.warn("Error fetching journal:", journalError);

    return {
      profile,
      inventory: inventory || [],
      tasks: tasks || [],
      journal: journal || [],
    };
  } catch (e) {
    console.warn("Sync fetch error:", e);
    return null;
  }
}

export async function pushProfile(userId, profileData) {
  if (!userId) return;
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        mana: profileData.mana,
        coin: profileData.wallet?.coin,
        gem: profileData.wallet?.gem,
        level: profileData.level,
        xp: profileData.xp,
        xp_goal: profileData.xpGoal,
        streak: profileData.streak,
        last_claim_date: profileData.lastClaimDate,
        // settings: profileData.settings // Future
      })
      .eq("id", userId);
      
    if (error) console.warn("Error pushing profile:", error);
  } catch (e) {
    console.warn("Sync push profile error:", e);
  }
}

export async function pushInventoryItem(userId, item) {
  if (!userId || !item.sku) return;
  try {
    // Upsert item
    const { error } = await supabase
      .from("inventory")
      .upsert({
        user_id: userId,
        sku: item.sku,
        category: item.category || "misc",
        quantity: item.quantity,
      }, { onConflict: "user_id,sku" });

    if (error) console.warn("Error pushing inventory item:", error);
  } catch (e) {
    console.warn("Sync push inventory error:", e);
  }
}

export async function pushTask(userId, task) {
  console.log('[SYNC] pushTask called:', { userId, taskId: task.id, title: task.title });
  if (!userId || !task.id) {
    console.warn('[SYNC] pushTask: missing userId or task.id');
    return null;
  }
  
  try {
    const payload = {
      user_id: userId,
      title: task.title,
      description: task.description || task.note,
      priority: task.priority,
      type: task.type,
      element: task.element,
      difficulty: task.difficulty,
      tags: task.tags,
      subtasks: task.subtasks,
      is_completed: task.done || task.completed,
      completed_at: task.completedAt,
      is_deleted: task.isDeleted || false,
    };
    
    // Regex for UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(task.id);
    console.log('[SYNC] Task ID is UUID?', isUUID, 'ID:', task.id);
    
    if (isUUID) {
      // Task already has a UUID, upsert it
      payload.id = task.id;
      console.log('[SYNC] Upserting task with UUID');
      const { error } = await supabase
        .from("tasks")
        .upsert(payload, { onConflict: "id" });
        
      if (error) {
        console.error("[SYNC] Error pushing task:", error);
        return null;
      }
      console.log('[SYNC] Task upserted successfully');
      return task.id;
    } else {
      // Task has a timestamp ID, insert as new and let Supabase generate UUID
      console.log('[SYNC] Inserting new task, Supabase will generate UUID');
      const { data, error } = await supabase
        .from("tasks")
        .insert(payload)
        .select()
        .single();
        
      if (error) {
        console.error("[SYNC] Error inserting task:", error);
        return null;
      }
      console.log('[SYNC] Task inserted successfully, new UUID:', data?.id);
      // Return the generated UUID so caller can update local state
      return data?.id || null;
    }
  } catch (e) {
    console.error("[SYNC] pushTask exception:", e);
    return null;
  }
}

export async function pushJournalEntry(userId, entry) {
  if (!userId || !entry.id) return;
  try {
    const { error } = await supabase
      .from("journal_entries")
      .upsert({
        id: entry.id, // UUID required
        user_id: userId,
        type: entry.type || "journal",
        content: entry.text || entry.content || "",
        mood: entry.mood,
        tags: entry.tags,
        created_at: entry.createdAt || new Date().toISOString(),
      }, { onConflict: "id" });

    if (error) console.warn("Error pushing journal entry:", error);
  } catch (e) {
    console.warn("Sync push journal error:", e);
  }
}

export async function updateDailyMetrics(userId, updates) {
  if (!userId) return;
  const date = new Date().toISOString().split("T")[0];
  try {
    // First, try to get existing row
    const { data: existing } = await supabase
      .from("daily_metrics")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .single();

    const payload = {
      user_id: userId,
      date: date,
      ...existing, // merge existing
      ...updates,  // overwrite with new
      updated_at: new Date().toISOString(),
    };
    
    // If rituals_completed is being updated, we might want to merge arrays?
    // For now, assuming caller handles logic or we just overwrite.
    
    const { error } = await supabase
      .from("daily_metrics")
      .upsert(payload, { onConflict: "user_id,date" });

    if (error) console.warn("Error pushing daily metrics:", error);
  } catch (e) {
    console.warn("Sync daily metrics error:", e);
  }
}
